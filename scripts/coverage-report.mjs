import { readFileSync, writeFileSync } from "node:fs"

const args = process.argv.slice(2)

const getArgValue = (name, fallback) => {
  const index = args.indexOf(`--${name}`)
  if (index === -1) {
    return fallback
  }
  const value = args[index + 1]
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for --${name}`)
  }
  return value
}

const inputPath = getArgValue(
  "input",
  "apps/web/coverage/coverage-summary.json",
)
const outputPath = getArgValue("output", "coverage-report.md")
const label = getArgValue("label", "apps/web")

const summary = JSON.parse(readFileSync(inputPath, "utf8"))
const total = summary.total
if (!total) {
  throw new Error("Coverage summary is missing total metrics.")
}

const formatPct = (value) =>
  Number.isFinite(value) ? value.toFixed(2) : "0.00"
const formatCovered = (metric) =>
  `${metric?.covered ?? 0}/${metric?.total ?? 0}`

const rows = [
  ["Lines", total.lines],
  ["Statements", total.statements],
  ["Functions", total.functions],
  ["Branches", total.branches],
]

const tableRows = rows
  .map(
    ([metricLabel, metric]) =>
      `| ${metricLabel} | ${formatPct(metric?.pct)}% | ${formatCovered(
        metric,
      )} |`,
  )
  .join("\n")

const body = `<!-- vitest-coverage-report -->
## Vitest Coverage Report

**Project**: ${label}

| Metric | % | Covered/Total |
| --- | --- | --- |
${tableRows}
`

writeFileSync(outputPath, body)
