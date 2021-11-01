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
    url: 'https://v3.football.api-sports.io/players/squads',
    params: {team: '201'},
    headers: {
      'x-rapidapi-key': 'fd9e2923f1d82234fbe496cf5b9e4e7d',
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  let players = []

  axios(config)
    .then(function (response) {
      const arrayLength = response.data.response.length
      for ( let i = 0; i < arrayLength; i++) {
        players.push(response.data.response[i].players)
      }
      console.log(players)
    })
    .catch(function (error) {
      console.log(error);
    });

  app.get('/', (req, res) => res.render('index.ejs', {
    data: players,
  }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

