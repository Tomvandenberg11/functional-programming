const moment = require('moment') // importing moment package

module.exports = data => data.map(item => moment(item).format('DD-MM-YYYY')) // refactoring dates to DD-MM-YYYY
