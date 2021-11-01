const _ = require('lodash')
const express = require('express')
const app = express()
const port = 3000;

main()

function main() {
  app.use(express.static('static'))

  const axios = require('axios');

  const config = {
    method: 'get',
    url: 'http://api.football-data.org/v2/competitions/PL/standings',
    headers: { 'X-Auth-Token': '75d02306c5a74efbb9c7cd735b2aa82d' },
  }

  let standings = []

  axios(config)
    .then(function (response) {
      const arrayLength = response.data.standings[0].table.length

      for ( let i = 0; i < arrayLength; i++) {
        standings.push(response.data.standings[0].table[i].team.name)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  app.get('/', (req, res) => res.render('index.ejs', {
    data: standings,
  }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

