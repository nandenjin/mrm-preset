const { existsSync } = require('fs')
const { json, copyFiles, packageJson } = require('mrm-core')
const consola = require('consola')

module.exports = () => {
  const deps = ['prettier']

  // Config
  json('.prettierrc.json')
    .merge({
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
    })
    .save()

  // ESLint
  if (existsSync('.eslintrc.json')) {
    consola.info(
      'prettier: .eslintrc.json detected. Adding eslint-prettier-config'
    )
    const eslintrc = json('.eslintrc.json')
    eslintrc.set('extends', [...eslintrc.get('extends'), 'prettier']).save()
    deps.push('eslint-config-prettier')
  }

  // Ignore file
  copyFiles('.gitignore', '.prettierignore')

  // Add package script
  const pkg = packageJson()
  pkg.appendScript(
    'format',
    'prettier --write "**/*.{js,ts,tsx,jsx,json,md,yml,yaml}"'
  )
  pkg.save()

  // Install deps
  install(deps)
}
