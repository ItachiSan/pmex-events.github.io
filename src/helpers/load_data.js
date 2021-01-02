export function load_rumors() {
  return fetch("/rumors.json")
    .then(response => response.json())
    .then(events => flatten_events(events));
}

export function load_announcements() {
  return fetch("/announcements.json")
    .then(response => response.json())
    .then(events => flatten_events(events));
}

export function flatten_events(events) {
  let result = [];
  for (let an_event of events) {
    for (let title of an_event.name) {
      result.push({
        title: title,
        date: new Date(an_event.date + " 06:00:00 UTC"),
        expires: new Date(an_event.expires + " 06:00:00 UTC")
      });
    }
  }
  return result;
}
