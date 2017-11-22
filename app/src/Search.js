import React from 'react';
import DatePicker from './DatePicker';

/**
 * Search among restaurants form
 */
function Search({ datetime, onChangeDateTime }) {
  return (
    <div className="Search">
      <h1>Please change time to display open restaurants</h1>

      <DatePicker
        datetime={datetime}
        onChangeDateTime={onChangeDateTime}
      />
    </div>
  );
}

export default Search;
