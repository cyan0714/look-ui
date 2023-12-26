const fs = require('fs');

const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
const readme = fs.readFileSync('README.md', 'utf-8');

const updatedReadme = readme + changelog;

fs.writeFileSync('README.md', updatedReadme);