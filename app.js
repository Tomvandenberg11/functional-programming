const _ = require('lodash')
const express = require('express')
const app = express()

const port = 3000;

const jsonFile = require('./tech-track-dataset.json')

main()

function main() {
  app.use(express.static('static'))

  const eyeColor = 'Wat is je oogkleur?'

  const color = jsonFile.map(answer =>
    _.capitalize(answer[eyeColor])
  )

  console.log(color)

  app.get('/', (req, res) => res.render('index.ejs', {
    data: color,
  }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

