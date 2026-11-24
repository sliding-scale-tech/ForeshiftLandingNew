// One-off: rasterize the two feature SVGs that embed multi-megabyte PNGs into
// display-sized AVIFs. The third feature image is a 3KB vector and stays an SVG.
// Hero, logo, footer, and CTA files are already small, so this script does not rewrite them.
import { statSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const imagesDir = path.resolve('public/images')

const jobs = [
  {
    input: 'Better _Staffing _Decisions.svg',
    out: 'better-staffing-decisions',
  },
  {
    input: 'Better_Data_Better _Insight.svg',
    out: 'better-data-better-insight',
  },
]

const widths = [640, 1280]

for (const job of jobs) {
  const inputPath = path.join(imagesDir, job.input)
  const before = statSync(inputPath).size
  console.log(`\n${job.input}  ${(before / 1024).toFixed(0)} KB`)
  for (const width of widths) {
    const suffix = width === 1280 ? '' : `-${width}`
    const outputPath = path.join(imagesDir, `${job.out}${suffix}.avif`)
    await sharp(inputPath, { unlimited: true })
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 62, effort: 6, chromaSubsampling: '4:4:4' })
      .toFile(outputPath)
    const after = statSync(outputPath).size
    const meta = await sharp(outputPath).metadata()
    console.log(
      `  ${path.basename(outputPath)}  ${meta.width}x${meta.height}  ${(after / 1024).toFixed(1)} KB  alpha=${meta.hasAlpha}`,
    )
  }
}
