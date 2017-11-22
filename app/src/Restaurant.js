import React from 'react';
import uniqid from 'uniqid';
import classNames from 'classnames';
import { DAYS } from './constants';

/**
 * Render a restaurant from a search result
 */
function Restaurant({ restaurant, onDay: day }) {
  const { name, hours } = restaurant;
  const restaurantHours = Object.keys(hours);

  // Generate a simple-to-use list of hours couples
  // [{ dayName: 'mon', openAt: --, closeAt: --}, ...]
  let hoursCouples = [];
  for (let i = 0; i < DAYS.length; i++) {
    const dayName = DAYS[i];
    let hoursCouple = { dayName };

    if (restaurantHours.indexOf(dayName + '_1_open') === -1) {
      hoursCouple.closed = true;
    } else {
      const openAt = hours[dayName + '_1_open'];
      const closeAt = hours[dayName + '_1_close'];

      hoursCouple = {
        ...hoursCouple,
        openAt,
        closeAt,
      };
    }

    hoursCouples.push(hoursCouple);
  }

  return (
    <div className="Restaurant">
      <span className="Restaurant_opened">
        {hours[day + '_1_open']} ~ {hours[day + '_1_close']}
      </span>

      <h1>{name}</h1>

      <ul className="Restaurant_hours">
        {hoursCouples.map(({ dayName, closeAt, closed, openAt }) => (
          <li
            key={uniqid()}
            className={classNames(
              'HourCouple',
              {'HourCouple--disabled': closed},
              {'HourCouple--selected': dayName === day},
            )}
          >
            {dayName[0].toUpperCase() + dayName.substr(1, 3)}.<br />
            {closed ? 'Closed' : openAt + '-' + closeAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurant;
