const _ = require('lodash')
const express = require('express')
const app = express()
const port = 3000;
const removeFC = require('./filters/removeFC')

main()

function main() {
  app.use(express.static('static'))

  const axios = require('axios')

  const configStandings = {
    method: 'get',
    url: 'http://api.football-data.org/v2/competitions/PL/standings',
    headers: { 'X-Auth-Token': '75d02306c5a74efbb9c7cd735b2aa82d' },
  }

  const configScores = {
    method: 'get',
    url: 'http://api.football-data.org/v2/competitions/PL/matches/?matchday=9',
    headers: { 'X-Auth-Token': '75d02306c5a74efbb9c7cd735b2aa82d' },
  }

  let standingsPL = []
  let homeTeam = []
  let awayTeam = []
  let scoreHome = []
  let scoreAway = []

  let cleanedStandings

  axios(configStandings)
    .then((response) => {
      const arrayLength = response.data.standings[0].table.length
      for ( let i = 0; i < arrayLength; i++) {
        standingsPL.push(response.data.standings[0].table[i].team.name)
      }
    })
    .then(() => cleanedStandings = removeFC(standingsPL))
    .catch((error) => console.log(error))

  axios(configScores)
    .then((response) => {
      const arrayLength = response.data.matches.length
      for ( let i = 1; i < arrayLength; i++) {
        homeTeam.push(response.data.matches[i].homeTeam.name)
        scoreHome.push(response.data.matches[i].score.fullTime.homeTeam)
        awayTeam.push(response.data.matches[i].awayTeam.name)
        scoreAway.push(response.data.matches[i].score.fullTime.awayTeam)
      }
    })
    .catch((error) => console.log(error))


  app.get('/', (req, res) => res.render('index.ejs', {
    dataPL: cleanedStandings,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    scoreHome: scoreHome,
    scoreAway: scoreAway,
  }))

  app.get('/', (req, res) => {
    const params = req.params; //params = {id:"000000"}
    console.log(params)

    res.render('index.ejs', {
      dataPL: standingsPL,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      scoreHome: scoreHome,
      scoreAway: scoreAway,
    })
  })


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

