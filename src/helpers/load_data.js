const rumorsJsonUrl = `${BASE_URL}rumors.json`;
const announcementsJsonUrl = `${BASE_URL}announcements.json`;

async function load_data(json_path) {
  const response = await fetch(json_path);
  const events = await response.json();
  return flatten_events(events);
}

export async function load_rumors() {
  return load_data(rumorsJsonUrl);
}

export async function load_announcements() {
  return load_data(announcementsJsonUrl);
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
