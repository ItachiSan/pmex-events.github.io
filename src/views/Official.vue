<template>
  <events-box
    :events="events"
    sort-by="begin"
    filter-dates="after"
    empty-message="No new official announcements."
  />
</template>

<script>
import { load_announcements } from "../helpers/load_data";
import EventsBox from "@/components/EventsBox";

export default {
  components: {
    EventsBox
  },
  data() {
    return { events: [] };
  },
  mounted() {
    let now = new Date(Date.now());
    load_announcements()
      .then(announcements =>
        announcements.filter(announcement => announcement.date > now)
      )
      .then(announcements => (this.events = announcements));
  }
};
</script>
