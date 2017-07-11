import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Store from "./store/Store";

import ConfigurationContainer from "./ConfigurationContainer";
import DayplannerContainer from "./DayplannerContainer";

import "./style/core.css";
import "./style/typography.css";
import "./style/map.css";
import "./style/ui.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: new Store()
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => <ConfigurationContainer store={this.state.store} />}
          />
          <Route
            path="/dayplanner/:locationId/:date/:departureDate/:arrivalTime/:departureTime"
            render={routeProps =>
              <DayplannerContainer
                params={routeProps.match.params}
                store={this.state.store}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
