<template>
  <div id="official">
    <special-message message="List of the currently ongoing events." />
    <events-box
      :events="events"
      sort-by="begin"
      empty-message="No new official announcements."
    />
  </div>
</template>

<script>
import { load_announcements } from "../helpers/load_data";
import EventsBox from "@/components/EventsBox";
import SpecialMessage from "@/components/SpecialMessage";

export default {
  components: {
    EventsBox,
    SpecialMessage
  },
  data() {
    return { events: [] };
  },
  mounted() {
    let now = new Date(Date.now());
    load_announcements()
      .then(announcements =>
        announcements.filter(
          announcement => announcement.date > now || announcement.date === null
        )
      )
      .then(announcements => (this.events = announcements));
  }
};
</script>
