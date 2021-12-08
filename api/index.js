const express = require('express')
const covince = require('covince-backend/middleware')

const app = express()
const knex = require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.disable('x-powered-by')

app.use('/api', covince(knex))

const port = process.env.HTTP_PORT || 4000

app.listen(port, () => {
  console.log('Server is up and running on port', port)
})
