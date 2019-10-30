// Defines the general themes for terminal styling through the Chalk library

const chalk = require('chalk');

const error = chalk.yellow.bold;
const neutral = chalk.blue.bold;
const success = chalk.green.bold;
const important = chalk.magenta.bold;
const major = chalk.red.bold;

module.exports = {
    error,
    neutral,
    success,
    important,
    major
};
