module.exports = function cleanFC(data) { // filter data from API file
  return data.map((item) => {
      return item.replace('FC', '').trim() // removing FC at the club name and removing whitespace
  })
}