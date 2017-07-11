import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";

class NumberMarker extends React.Component {
  render() {
    let cls = classNames({
      "number-marker": true,
      "info-marker": true,
      "number-marker-primary": this.props.primary ? true : false,
      [`color-marker-${this.props.color}`]: true,
      "marker-active": this.props.poi.hover || this.props.$hover
    });

    return (
      <div className={cls}>
        <h2>
          {this.props.poi.name}
        </h2>
        <div>
          {this.props.number}
        </div>
      </div>
    );
  }
}

export default observer(NumberMarker);
