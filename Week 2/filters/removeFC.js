module.exports = function filterData(data) { // filter data from API file
  return data.filter((item) => {
      console.log(item.replace('FC', ''))
      return item.replace('FC', '')
  })
}