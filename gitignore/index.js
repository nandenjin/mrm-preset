const { lines } = require('mrm-core')
const fetch = require('sync-fetch')

module.exports = () => {
  const content = fetch('https://www.toptal.com/developers/gitignore/api/node').text()
  lines('.gitignore').add(content).save()
}
