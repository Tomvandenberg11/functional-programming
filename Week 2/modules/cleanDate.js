const moment = require('moment') // importing moment package

module.exports = function filterDate(data) { // filter data from API file
  return data.map((item) => {
    return moment(item).format('DD-MM-YYYY') // refactor date to DD-MM-YYYY format
  })
}