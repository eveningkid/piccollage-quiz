import React from 'react';
import uniqid from 'uniqid';
import Restaurant from './Restaurant';

/**
 * Render restaurants from a search result
 */
function Restaurants({ restaurants, onDay }) {
  return (
    <div className="Restaurants">
      {restaurants.length ?
        <div className="Alert Alert--info">{restaurants.length} restaurant(s) are opened at this time!</div> :
        <div className="Alert Alert--error">No results! Try another time/day.</div>
      }

      {restaurants.map((restaurant) => (
        <Restaurant
          key={uniqid()}
          restaurant={restaurant}
          onDay={onDay}
        />
      ))}
    </div>
  );
}

export default Restaurants;
