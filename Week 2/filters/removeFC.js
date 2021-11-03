module.exports = function filterData(data) { // filter data from API file
  return data.map((item) => {
      return item.replace('FC', '').trim()
  })
}