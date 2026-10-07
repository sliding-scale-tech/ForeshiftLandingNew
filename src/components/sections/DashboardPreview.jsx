// Full-width product screenshot between the feature rows and "Demand insights for the decisions
// ahead." Staged data, so it carries the "Sample outlook" label.
export default function DashboardPreview() {
  return (
    <section className="dashboard-preview" aria-label="Product screenshot">
      <img
        src="/images/daily-outlook-dashboard.webp"
        loading="lazy"
        width="1586"
        height="992"
        sizes="(max-width: 991px) 92vw, 1100px"
        srcSet="/images/daily-outlook-dashboard-p-500.webp 500w, /images/daily-outlook-dashboard-p-800.webp 800w, /images/daily-outlook-dashboard-p-1080.webp 1080w, /images/daily-outlook-dashboard.webp 1586w"
        alt="ForeShift Today's Demand Forecast: an operations brief, expected demand for each daypart, a demand chart and the top demand drivers"
        className="dashboard-preview-image"
      />
      <p className="illustration-caption">Sample outlook: illustrative data.</p>
    </section>
  )
}
