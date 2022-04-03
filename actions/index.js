const { readFileSync } = require('fs')
const { resolve } = require('path')
const { yaml } = require('mrm-core')
const { parse } = require('yaml')

module.exports = () => {
  const content = parse(
    readFileSync(resolve(__dirname, './workflows/push.yml'), 'utf8')
  )
  yaml('.github/workflows/push.yml').set(content)
}
