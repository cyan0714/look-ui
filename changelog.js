const fs = require('fs');
const md = require('markdown-it')();

const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
const changelogHTML = md.render(changelog);

const readme = fs.readFileSync('README.md', 'utf-8');

const updatedReadme = readme + changelogHTML;

fs.writeFileSync('README.md', updatedReadme);