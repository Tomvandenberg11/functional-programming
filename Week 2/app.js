const express = require('express') // declaring express as templating engine
const app = express()
require('dotenv').config({path: '.env-dev'}) // config .env file
const port = process.env.PORT || 3000 // declaring port
const TOKEN = process.env.TOKEN // importing API token from .env-dev file

const axios = require('axios') // importing axios

const cleanClubs = require('./modules/cleanClubs') // importing cleanClubs module
const cleanDate = require('./modules/cleanDate')// importing cleanDate module

// declaring empty arrays as global variables
let standingsPL = []
let logo = []
let matchDate = []
let homeTeam = []
let awayTeam = []
let scoreHome = []
let scoreAway = []

let cleanedStandings
let cleanedMatchDate
let cleanedHomeTeam
let cleanedAwayTeam

const main = () => {
  app.use(express.static('static')) // declaring static as static folder

  // importing the standings API
  const configStandings = {
    method: 'get',
    url: 'https://api.football-data.org/v2/competitions/PL/standings',
    headers: { 'X-Auth-Token': TOKEN },
  }


  let matchDay = 10 // declaring default round variable

  // importing the matches API
  const configScores = {
      method: 'get',
      url: `https://api.football-data.org/v2/competitions/PL/matches/?matchday=${matchDay}`,
      headers: { 'X-Auth-Token': process.env.TOKEN },
  }

  // function to import and clean the standings and logo's
  axios(configStandings)
    .then(response => {
      standingsPL = response.data.standings[0].table.map(item => item.team.name) // mapping all team names in new array
      logo = response.data.standings[0].table.map(item => item.team.crestUrl) // mapping all team logos in new array
    })
    .then(() => cleanedStandings = cleanClubs(standingsPL)) // cleaning standingsPL by cleanClubs module and putting it in cleanedStandings
    .catch((error) => console.log(error))

  // function to import and clean dates, teams and scores
  axios(configScores)
    .then((response) => {
      matchDate = response.data.matches.map(item => item.utcDate) // mapping all match dates in new array
      homeTeam = response.data.matches.map(item => item.homeTeam.name) // mapping all home teams in new array
      awayTeam = response.data.matches.map(item => item.awayTeam.name) // mapping all away teams in new array
      scoreHome = response.data.matches.map(item => item.score.fullTime.homeTeam) // mapping all home scores in new array
      scoreAway = response.data.matches.map(item => item.score.fullTime.awayTeam) // mapping all away scores in new array
    })
    .then(() => cleanedMatchDate = cleanDate(matchDate)) // cleaning matchDate by cleanDate module and putting it in cleanedMatchDate
    .then(() => cleanedHomeTeam = cleanClubs(homeTeam)) // cleaning homeTeam by cleanClubs module and putting it in cleanedHomeTeam
    .then(() => cleanedAwayTeam = cleanClubs(awayTeam)) // cleaning awayTeam by cleanClubs module and putting it in cleanedAwayTeam
    .catch((error) => console.log(error))

  // rendering all data to the index.ejs
  app.get('/', (req, res) => res.render('index.ejs', {
    dataPL: cleanedStandings,
    date: cleanedMatchDate,
    logo: logo,
    homeTeam: cleanedHomeTeam,
    awayTeam: cleanedAwayTeam,
    scoreHome: scoreHome,
    scoreAway: scoreAway,
  }))

  // console.log showing port
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}

main()

