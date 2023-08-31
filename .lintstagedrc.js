module.exports = {
  '*.{ts,js,html,scss,json,md}': ['prettier --write'],
  'src/**/*.{ts,js,html}': files =>
    `ng lint ${files.map(file => `--lint-file-patterns ${file}`).join(' ')}`,
};
