import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import LocationAutoComplete from "./component/LocationAutoComplete";

class ConfigurationContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onSelectLocation = loc => {
    this.props.store.updateLocation(loc);
  };

  buildUrl = () => {
    const { store } = this.props;
    return `/dayplanner/${store.location
      .id}/${store.dateString}/${store.departureDateString}/${store.arrivalTime}/${store.departureTime}`;
  };

  render() {
    const { store } = this.props;

    return (
      <div className="configuration-container">
        <div className="configuration-form">
          <h1>Triposo API Dayplanner demo</h1>
          <ul className="form-list">
            <li>
              <label>Where are you going?</label>
              <LocationAutoComplete
                onSelectLocation={location => (store.location = location)}
              />
            </li>
            <li>
              <label>Start date</label>
              <input
                type="date"
                name="start-date"
                onChange={e => (store.date = new Date(e.target.value))}
              />
            </li>
            <li>
              <label>Arrival time</label>
              <input
                type="time"
                name="arrival-time"
                onChange={e => (store.arrivalTime = e.target.value)}
              />
            </li>
            <li>
              <label>End date</label>
              <input
                type="date"
                name="end-date"
                onChange={e => (store.departureDate = new Date(e.target.value))}
              />
            </li>
            <li>
              <label>Departure time</label>
              <input
                type="time"
                name="departure-time"
                onChange={e => (store.departureTime = e.target.value)}
              />
            </li>
          </ul>
          <Link
            className={store.validData ? "action" : "action disabled"}
            to={this.buildUrl()}
            onClick={e => {
              if (!store.validData) e.preventDefault();
            }}
          >
            Build day plan
          </Link>
        </div>
      </div>
    );
  }
}

export default observer(ConfigurationContainer);
