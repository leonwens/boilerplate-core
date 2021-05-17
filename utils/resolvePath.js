const fs = require('fs');
const { resolve } = require('path');
const projectDirectory = fs.realpathSync(process.cwd());

module.exports = relativePath => resolve(projectDirectory, relativePath || '');
