/**
 * Object for days' codes, according to each weekday index
 * 1 => 'mon'
 */
const dayCodes = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

/**
 * Util returning a week day given
 * @param {number} index Index from 1~7
 * @return {string}
 */
export function indexToWeekDay(index) {
  return dayCodes[index];
}
