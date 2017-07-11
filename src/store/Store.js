import { extendObservable, action, computed } from "mobx";
import { apiRequest, leadingZero } from "../utils";

import DayPlan from "./DayPlan";

export default class Store {
  constructor() {
    extendObservable(this, {
      location: { id: null },
      plan: [],
      date: null,
      departureDate: null,
      dayplanLoading: false,
      arrivalTime: null,
      departureTime: null,
      validData: computed(() => {
        return (
          this.location.id !== null &&
          this.date !== null &&
          this.arrivalTime !== null &&
          this.departureTime !== null
        );
      }),
      dateString: computed(() => {
        if (!this.date) return "";
        return (
          this.date.getFullYear() +
          "-" +
          leadingZero(this.date.getMonth() + 1) +
          "-" +
          this.date.getDate()
        );
      }),
      departureDateString: computed(() => {
        if (!this.departureDate) return "";
        return (
          this.departureDate.getFullYear() +
          "-" +
          leadingZero(this.departureDate.getMonth() + 1) +
          "-" +
          this.departureDate.getDate()
        );
      })
    });
  }

  fetchDayPlan() {
    this.plan.clear();
    this.dayplanLoading = true;
    return apiRequest(
      `day_planner.json?location_id=${this.location.id}&start_date=${this
        .dateString}&end_date=${this.departureDateString}&arrival_time=${this
        .arrivalTime}&departure_time=${this.departureTime}`
    ).then(
      action(json => {
        this.dayplanLoading = false;
        if (json.results && json.results.length) {
          json.results[0].days.forEach((p, n) => {
            this.plan.push(new DayPlan(n, p));
          });
        }
      }),
      error => console.log(error)
    );
  }

  getBounds() {
    let r = {
      minLat: 0,
      minLng: 0,
      maxLat: 0,
      maxLng: 0
    };

    this.plan.forEach(plan => {
      plan.items.forEach(item => {
        if (item.poi) {
          let { latitude, longitude } = item.poi.coordinates;
          if (r.minLat === 0 || latitude < r.minLat) r.minLat = latitude;
          if (r.maxLat === 0 || latitude > r.maxLat) r.maxLat = latitude;
          if (r.minLng === 0 || longitude < r.minLng) r.minLng = longitude;
          if (r.maxLng === 0 || longitude > r.maxLng) r.maxLng = longitude;
        }
      });
    });

    if (r.minLat === r.maxLat && r.minLng === r.maxLng) {
      r.maxLat += 0.01;
      r.maxLng += 0.01;
    }

    return r;
  }
}
