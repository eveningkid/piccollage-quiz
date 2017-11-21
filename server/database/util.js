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
 * Given a 'hh:mm' string, return an integer summing up the total minutes
 * @param {string} text
 */
function hoursToMinutes(text) {
  let [hours, minutes] = text.split(':');
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);
  return hours * 60 + minutes;
}

/**
 * Given a number of minutes, return a string formatted such as 'hh:mm'
 * @param {number} total
 */
function minutesToString(total) {
  let hours = Math.floor(total / 60);
  hours = (hours < 10 ? '0' : '') + hours;
  let minutes = total % 60;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  return `${hours}:${minutes}`;
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

/**
 * Object for days' codes, according to each weekday index
 * 1 => 'mon'
 */
const dayCodes = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun',
};

/**
 * Util returning a week day given
 * @param {number} index Index from 1~7
 * @return {string}
 */
function indexToWeekDay(index) {
  return dayCodes[index];
}

module.exports.importSample = importSample;
module.exports.hoursToMinutes = hoursToMinutes;
module.exports.minutesToString = minutesToString;
module.exports.info = info;
module.exports.error = error;
module.exports.success = success;
module.exports.indexToWeekDay = indexToWeekDay;
