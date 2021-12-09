const fs = require('fs')
const mapTsvToRecords = require('../mapTsvToRecords')

exports.seed = async function (knex) {
  // const fetch = await import('node-fetch').then(({ default: fetch }) => fetch)
  // const response = await fetch('https://covid-surveillance-data.cog.sanger.ac.uk/download/lineages_by_ltla_and_week.tsv')
  // const text = await response.text()

  const text = fs.readFileSync('/tmp/input.tsv', 'utf8')

  const records = mapTsvToRecords(text)
  console.log('Mapped', records.length, 'records, inserting ...')
  await knex('aggregated').del()
  await knex.batchInsert('aggregated', records)

  await knex('last_updated').insert({ id: 0, timestamp: Date.now() }).onConflict('id').merge()
}
