const { packageJson, lines, install, json, file } = require('mrm-core')

module.exports = () => {
  const dependencies = [
    'typescript',
    'eslint',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
  ]

  // Ignore cache file on git
  lines('.gitignore').add('.eslintcache').save()

  // Config
  json('.eslintrc.json')
    .merge({
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    })
    .save()

  // Ignorefiles
  lines('.eslintignore').add(file('.gitignore').get()).save()

  // Add package script
  packageJson()
    .appendScript('lint', 'eslint . --ext ts')
    .appendScript('lintfix', 'eslint . --ext ts --fix')
    .save()

  // Install deps
  install(dependencies)
}
