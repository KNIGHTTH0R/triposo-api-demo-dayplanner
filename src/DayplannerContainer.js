import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import moment from "moment";

import PoiItem from "./component/PoiItem";
import Loading from "./component/Loading";
import DayplannerMap from "./component/DayplannerMap";

class DayplannerContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  componentDidMount() {
    const {
      locationId,
      date,
      departureDate,
      arrivalTime,
      departureTime
    } = this.props.params;
    const { store } = this.props;

    store.location = { id: locationId };
    store.date = new Date(date);
    store.departureDate = new Date(departureDate);
    store.arrivalTime = arrivalTime;
    store.departureTime = departureTime;

    store.fetchDayPlan();
  }

  calcDate(n) {
    let d = this.props.store.date;
    return moment(d).add(n, "days").format("MMM D");
  }

  render() {
    const { store } = this.props;

    return (
      <div className="dayplanner-container">
        {store.dayplanLoading ? <Loading /> : ""}
        <div className="dayplanner-map-container">
          <DayplannerMap store={store} />
        </div>
        <div className="dayplanner-result">
          <div className="plan-content">
            <ul className="day-tabs">
              {store.plan.map((p, n) => {
                return (
                  <li
                    key={p.index + "-tab"}
                    className={
                      n === this.state.activeTab ? "active" : "inactive"
                    }
                  >
                    <div className={`color-dot color-marker-${n}`}>
                      <div />
                    </div>
                    <a
                      href="#0"
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ activeTab: n });
                      }}
                    >
                      Day {p.index + 1}
                      <span>{p.humanDateString}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            {store.plan.length
              ? <Day plan={store.plan[this.state.activeTab]} store={store} />
              : ""}

            {store.dayplanLoading ? <Loading /> : ""}
          </div>
        </div>

        <Link className="home-button" to="/">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Link>
      </div>
    );
  }
}

export default observer(DayplannerContainer);

class Day extends React.Component {
  render() {
    const { plan, store } = this.props;
    const items = plan.items;

    return (
      <div className="day">
        <div className="container">
          <div className="day-list">
            {items.map((item, n) => {
              return <DayItem key={`day-item-${n}`} item={item} />;
            })}

            {!items.length
              ? <div className="empty">
                  <p>
                    You are arriving at <strong>{store.arrivalTime}</strong>
                  </p>
                  <p>Nothing planned on this day.</p>
                </div>
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

class DayItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="day-item">
        {item.title
          ? <h3 className="day-part">
              {item.title}
            </h3>
          : <hr />}
        {item.poi
          ? <PoiItem
              poi={item.poi}
              bookUrl={
                item.poi.booking_info
                  ? item.poi.booking_info.vendor_object_url
                  : null
              }
              collapsed={true}
            />
          : ""}
        <p className="description">
          {item.description}
        </p>
      </div>
    );
  }
}
