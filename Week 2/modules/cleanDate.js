const moment = require('moment')

module.exports = function filterData(data) { // filter data from API file
  return data.map((item) => {
    return moment(item).format('DD-MM-YYYY')
  })
}