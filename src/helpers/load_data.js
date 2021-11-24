import { publicPath } from "../../vue.config";

export function load_rumors() {
  return fetch(publicPath + "rumors.json")
    .then((response) => response.json())
    .then((events) => flatten_events(events));
}

export function load_announcements() {
  return fetch(publicPath + "announcements.json")
    .then((response) => response.json())
    .then((events) => flatten_events(events));
}

export function flatten_events(events) {
  let result = [];
  for (let an_event of events) {
    for (let title of an_event.name) {
      result.push({
        title: title,
        date:
          an_event.date === "TBA"
            ? null
            : new Date(an_event.date + " 06:00:00 UTC"),
        expires: an_event.expires
          ? new Date(an_event.expires + " 06:00:00 UTC")
          : null,
      });
    }
  }
  return result;
}
