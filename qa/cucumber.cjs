module.exports = {
  default: {
    paths: ['features/create_user.feature', 'features/login.feature'],
    require: ['step_definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:cucumber-report.html',
    ],
    publishQuiet: true,
  },
}
