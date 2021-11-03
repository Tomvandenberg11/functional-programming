const express = require('express')
const app = express()
const port = 3000;
const cleanClubs = require('./modules/cleanClubs')
const cleanDate = require('./modules/cleanDate')

main()

function main() {
  app.use(express.static('static'))

  const axios = require('axios')

  const configStandings = {
    method: 'get',
    url: 'https://api.football-data.org/v2/competitions/PL/standings',
    headers: { 'X-Auth-Token': '75d02306c5a74efbb9c7cd735b2aa82d' },
  }

  const configScores = {
    method: 'get',
    url: `http://api.football-data.org/v2/competitions/PL/matches/?matchday=10`,
    headers: { 'X-Auth-Token': '75d02306c5a74efbb9c7cd735b2aa82d' },
  }

  let standingsPL = []
  let logo = []
  let matchDate = []
  let homeTeam = []
  let awayTeam = []
  let scoreHome = []
  let scoreAway = []

  let cleanedStandings
  let cleanedMatchDate

  axios(configStandings)
    .then(response => {
      standingsPL = response.data.standings[0].table.map(item => item.team.name)
      logo = response.data.standings[0].table.map(item => item.team.crestUrl)
    })
    .then(() => cleanedStandings = cleanClubs(standingsPL))
    .catch((error) => console.log(error))

  axios(configScores)
    .then((response) => {
      matchDate = response.data.matches.map(item => item.utcDate)
      homeTeam = response.data.matches.map(item => item.homeTeam.name)
      awayTeam = response.data.matches.map(item => item.awayTeam.name)
      scoreHome = response.data.matches.map(item => item.score.fullTime.homeTeam)
      scoreAway = response.data.matches.map(item => item.score.fullTime.awayTeam)
    })
    .then(() => cleanedMatchDate = cleanDate(matchDate))
    .catch((error) => console.log(error))


  app.get('/', (req, res) => res.render('index.ejs', {
    dataPL: cleanedStandings,
    date: cleanedMatchDate,
    logo: logo,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    scoreHome: scoreHome,
    scoreAway: scoreAway,
  }))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

