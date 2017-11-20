const chalk = require('chalk');
const fs = require('fs');

/**
 * Import sample file from `path`
 * Return a list of entries for each restaurant
 * @param {string} path Path to file
 * @return {Promise}
 */
function importSample(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject([]);
      }

      let entries = [];
      if (data) {
        for (let line of data.split('\n')) {
          line = line.trim();

          if (!line.length) {
            continue;
          }

          const entry = JSON.parse(line);
          entries.push(entry);
        }
      }

      resolve(entries);
    });
  });
}

/**
 * Log an information message
 * @param {string} text
 */
function info(text) {
  console.log(chalk.yellow(text))
}

/**
 * Log an error message
 * @param {string} text
 */
function error(text) {
  console.error(chalk.red(text));
}

/**
 * Log a success message
 * @param {string} text
 */
function success(text) {
  console.error(chalk.green(text));
}

module.exports.importSample = importSample;
module.exports.info = info;
module.exports.error = error;
module.exports.success = success;
