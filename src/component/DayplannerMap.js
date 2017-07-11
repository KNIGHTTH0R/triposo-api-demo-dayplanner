import React from "react";
import { observer } from "mobx-react";
import GoogleMap from "google-map-react";
import { fitBounds } from "google-map-react/utils";

import NumberMarker from "./NumberMarker";

class DayplannerMap extends React.Component {
  getMarker(n, item, store, key, lat, lng) {}

  render() {
    const { store } = this.props;
    if (!store.plan.length) {
      return <div className="dayplanner-map">...</div>;
    }

    let markers = [];
    store.plan.forEach((plan, n) => {
      plan.items.forEach((item, n2) => {
        if (item.poi) {
          markers.push(
            <NumberMarker
              color={n}
              number={n2 + 1}
              key={item.poi.id}
              poi={item.poi}
              lat={item.poi.coordinates.latitude}
              lng={item.poi.coordinates.longitude}
            />
          );
        }
      });
    });

    let b = store.getBounds();
    let bounds = fitBounds(
      {
        nw: { lat: b.maxLat, lng: b.minLng },
        se: { lat: b.minLat, lng: b.maxLng }
      },
      { width: 400, height: 900 }
    );

    return (
      <div className="dayplanner-map">
        <GoogleMap zoom={bounds.zoom} center={bounds.center}>
          {markers}
        </GoogleMap>
      </div>
    );
  }
}

export default observer(DayplannerMap);
