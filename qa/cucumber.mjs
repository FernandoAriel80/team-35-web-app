export default {
  default: {
    paths: ['features/create_user.feature'],
    require: ['step_definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/esm'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:cucumber-report.html',
    ],
    publishQuiet: true,
  },
}
