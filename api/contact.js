// POST /api/contact: validates the contact form and emails it to the ForeShift inboxes via Resend.
// Plain Node handler (works as a Vercel function and under the Vite dev middleware). No SDK: one
// fetch to Resend's REST API, so there is no extra dependency. The API key stays server-side.
import { validateContact } from "../shared/contact.js";

// Recipients are fixed here. The client can never choose where mail goes.
const TO = [
  "info@foreshift.ai",
  "dev@foreshift.ai",
];
const FROM =
  process.env.RESEND_FROM || "ForeShift Contact Form <contact@foreshift.ai>";
const MAX_BODY_BYTES = 10 * 1024;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 };

// Best-effort limiter (per warm instance). The honeypot and Resend's own limits back it up.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000)
    for (const [k, v] of hits)
      if (!v.some((t) => now - t < RATE.windowMs)) hits.delete(k);
  return false;
}

function allowedOrigin(origin) {
  if (!origin) return false;
  let url;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  const prod = (process.env.VITE_SITE_URL || "https://foreshift.ai").replace(
    /\/$/,
    "",
  );
  const allowed = new Set([
    prod,
    "https://foreshift.ai",
    "https://www.foreshift.ai",
  ]);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (allowed.has(url.origin)) return true;
  return (
    process.env.NODE_ENV !== "production" &&
    ["localhost", "127.0.0.1"].includes(url.hostname)
  );
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES)
      throw Object.assign(new Error("too large"), { code: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(new Error("bad json"), { code: 400 });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "Method not allowed." });
  }
  if (!allowedOrigin(req.headers.origin))
    return send(res, 403, { ok: false, error: "Request not allowed." });
  if (
    !String(req.headers["content-type"] || "")
      .toLowerCase()
      .startsWith("application/json")
  ) {
    return send(res, 415, { ok: false, error: "Unsupported request." });
  }
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  )
    .split(",")[0]
    .trim();
  if (limited(ip)) {
    res.setHeader("Retry-After", "600");
    return send(res, 429, {
      ok: false,
      error: "Too many messages. Please try again in a few minutes.",
    });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (e) {
    return send(res, e.code === 413 ? 413 : 400, {
      ok: false,
      error: "Invalid request.",
    });
  }

  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (typeof body?.website === "string" && body.website.trim() !== "")
    return send(res, 200, { ok: true });

  const { ok, values, errors } = validateContact(body);
  if (!ok) return send(res, 422, { ok: false, errors });

  const apiKey = process.env.RESEND_API_KEY || process.env.resend_api_key;
  if (!apiKey) {
    console.error("contact: Resend API key is not configured");
    return send(res, 500, {
      ok: false,
      error: "Something went wrong on our side. Please email us directly.",
    });
  }

  const { name, email, restaurant, topic, message } = values;
  const subject = `[ForeShift Contact Form] ${topic} from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Restaurant: ${restaurant || "Not provided"}`,
    `Topic: ${topic}`,
    "",
    message,
  ].join("\n");
  const row = (k, v) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#636f86">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`;
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1a202c;line-height:1.5">` +
    `<table style="border-collapse:collapse;margin-bottom:16px">${row("Name", name)}${row("Email", email)}` +
    `${row("Restaurant", restaurant || "Not provided")}${row("Topic", topic)}</table>` +
    `<div style="white-space:pre-wrap;border-left:3px solid #0270df;padding-left:12px">${esc(message)}</div></div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.error(
        "contact: Resend rejected the send",
        r.status,
        (await r.text()).slice(0, 300),
      );
      return send(res, 502, {
        ok: false,
        error: "We could not send your message. Please email us directly.",
      });
    }
  } catch (e) {
    console.error("contact: send failed", e?.name);
    return send(res, 502, {
      ok: false,
      error: "We could not send your message. Please email us directly.",
    });
  }
  return send(res, 200, { ok: true });
}
