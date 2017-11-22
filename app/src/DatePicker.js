import React from 'react';
import Kronos from 'react-kronos';

/**
 * Date and time pickers wrapper
 */
function DatePicker({ datetime, onChangeDateTime }) {
  return (
    <div>
      <div className="Picker">
        <Kronos
          date={datetime}
          onChangeDateTime={onChangeDateTime}
        />
      </div>

      <div className="Picker">
        <Kronos
          time={datetime}
          onChangeDateTime={onChangeDateTime}
          className="Picker"
        />
      </div>
    </div>
  );
}

export default DatePicker;
