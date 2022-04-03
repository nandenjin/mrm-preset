const { json } = require('mrm-core')

module.exports = () => {
  json('renovate.json')
    .merge({
      extends: ['config:base'],
      labels: ['dependencies'],
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
