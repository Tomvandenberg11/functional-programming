const _ = require('lodash')
const express = require('express')
const app = express()
const colorString = require('color-string')

const port = 3000;

const jsonFile = require('./tech-track-dataset.json')

main()

function main() {
  app.use(express.static('static'))

  const question = 'Wat is je oogkleur?'

  const color = jsonFile.map(answer =>
    answer[question].toLowerCase()
  )

  const getColor = function (color) {
    switch (color) {
      case 'bruin':
        return 'sienna'
      case 'blauw':
        return 'deepskyblue'
      case 'grijs':
        return 'gray'
      case 'groen':
        return 'green'
      case 'donkerbruin':
        return 'saddlebrown'
      case 'groen - grijs':
        return 'darkseagreen'
      case 'groen-grijs':
        return 'darkseagreen'
      case 'groen-blauw':
        return 'mediumaquamarine'
    }
  }

  const arrayLength = color.length;

  function translateColor(item) {
    return getColor(item)
  }

  const rgb = []

  for ( let i = 0; i < arrayLength; i++) {
    rgb.push(translateColor(color[i]))
  }

  app.get('/', (req, res) => res.render('index.ejs', {
    data: rgb,
  }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

