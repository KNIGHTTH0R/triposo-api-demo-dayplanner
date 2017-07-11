import { extendObservable } from "mobx";
import Poi from "./Poi";

export default class DayPlanItem {
  constructor(json = null) {
    extendObservable(this, {
      poi: null,
      title: "",
      description: ""
    });
    if (json) this.fromJSON(json);
    return this;
  }

  fromJSON(json) {
    this.title = json.title;
    this.description = json.description;
    if (json.poi) {
      let poi = new Poi();
      poi.fromJSON(json.poi);
      this.poi = poi;
    }
  }
}
