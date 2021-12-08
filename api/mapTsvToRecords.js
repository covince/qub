const { isPangoLineage, expandLineage } = require('pango-utils')

module.exports = (text) => {
  const rows = text.split('\n').slice(1)

  const data = {}
  for (const row of rows) {
    const [date, ltla, lineage, count] = row.split('\t')
    if (isPangoLineage(lineage)) {
      const record = { ltla, lineage, count: parseInt(count) }
      if (date in data) {
        data[date].push(record)
      } else {
        data[date] = [record]
      }
    }
  }
  const entries = Object.entries(data)
  entries.sort(([a], [b]) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })

  const records = []
  for (let i = 0; i < entries.length; i++) {
    const [date, _records] = entries[i]
    console.log(date, _records.length)
    for (const { ltla, lineage, count } of _records) {
      // handle sliding window
      if (entries[i + 1]) {
        const [, nextRecords] = entries[i + 1]
        const nextWeek = nextRecords.find(_ => _.ltla === ltla && _.lineage === lineage)
        if (!nextWeek) {
          nextRecords.push({ ltla, lineage, count: 0 })
        }
      }
      const previousWeek = i > 0 ? entries[i - 1][1].find(_ => _.ltla === ltla && _.lineage === lineage) : null
      const period_count = count + (previousWeek ? previousWeek.count : 0)
      const average = period_count / 2

      if (average > 0) {
        records.push({
          area: ltla,
          count,
          date,
          lineage,
          pango_clade: `${expandLineage(lineage)}.`,
          period_count
        })
      }
    }
  }
  return records
}
