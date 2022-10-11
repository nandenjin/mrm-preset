const { json } = require('mrm-core')

module.exports = () => {
  json('.github/renovate.json')
    .merge({
      extends: ['config:base'],
      labels: ['dependencies'],
      schedule: [`* ${Math.floor(Math.random() * 24)} ${Math.floor(Math.random() * 28)} * *`],
      lockFileMaintenance: { enabled: true },
      packageRules: [
        {
          matchUpdateTypes: [
            'minor',
            'patch',
            'pin',
            'digest',
            'lockFileMaintenance',
          ],
          automerge: true,
          automergeType: 'branch',
        },
      ],
    })
    .save()
}
