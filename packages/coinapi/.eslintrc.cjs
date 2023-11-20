module.exports = {
  root: true,
  extends: ['custom'],
  overrides: [
    { parserOptions: { project: ['./tsconfig.json'] }, files: ['*.ts'] },
  ],
}
