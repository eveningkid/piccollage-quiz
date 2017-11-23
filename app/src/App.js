import React, { Component } from 'react';
import classNames from 'classnames';
import Search from './Search';
import Restaurants from './Restaurants';
import { API_URL } from './constants';
import { indexToWeekDay } from './util';

/**
 * Main Renderer
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datetime: new Date(),
      error: '',
      results: {},
      gotResponse: false,
      isFetching: false,
    };
    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.lookupRestaurants = this.lookupRestaurants.bind(this);
  }

  componentDidMount() {
    this.lookupRestaurants();
  }

  onChangeDateTime(datetime) {
    this.setState({ datetime }, () => this.lookupRestaurants());
  }

  lookupRestaurants() {
    // Reset the error field
    this.setState({ error: '', isFetching: true });

    const { datetime } = this.state;
    const weekdayIndex = datetime.getDay();
    const day = indexToWeekDay(weekdayIndex);

    // Given a timestamp, we get how many minutes were spent on that day
    // In order to query `restaurants`
    const hours = datetime.getHours();
    const hoursText = hours.toFixed().length > 1 ? hours : '0' + hours;
    const minutes = datetime.getMinutes();
    const minutesText = minutes.toFixed().length > 1 ? minutes : '0' + minutes;
    const time = hoursText + ':' + minutesText;

    // Prepare the POST request (payload, configuration)
    const payload = {
      time,
      day,
    };

    const requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    };

    fetch(`${API_URL}/restaurants`, requestConfig)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Network issue. Please try again later.');
      })
      .then((results) => {
        this.setState({ results, gotResponse: true, isFetching: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isFetching: false });
      });
  }

  renderResults(restaurants, onDay) {
    return <Restaurants restaurants={restaurants} onDay={onDay} />;
  }

  render() {
    const {
      datetime,
      error,
      gotResponse,
      isFetching,
      results: { onDay, restaurants },
    } = this.state;

    return (
      <div className="App">
        <Search
          datetime={datetime}
          onChangeDateTime={this.onChangeDateTime}
        />

        <div
          className={classNames(
            'SearchResults',
            {'SearchResults--fetched': !isFetching},
          )}
        >
          {error && <div className="Alert Alert--error">{error}</div>}
          {gotResponse && this.renderResults(restaurants, onDay)}
        </div>
      </div>
    );
  }
}

export default App;
