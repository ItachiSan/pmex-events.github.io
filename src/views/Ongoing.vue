<template>
  <events-box
    id="ongoing"
    :events="events"
    sort-by="end"
    filter-dates="after"
    empty-message="No events tracked."
  />
</template>

<script>
import EventsBox from "@/components/EventsBox";
import { load_rumors } from "../helpers/load_data";

export default {
  components: {
    EventsBox
  },
  data() {
    return { events: [] };
  },
  mounted() {
    load_rumors()
      .then(
        // Keep only the ongoing rumors
        rumors => {
          let now = new Date(Date.now());
          return rumors.filter(
            event => event.date < now && event.expires > now
          );
        }
      )
      .then(rumors => (this.events = rumors));
  }
};
</script>
