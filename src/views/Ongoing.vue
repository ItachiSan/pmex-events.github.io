<template>
  <div id="ongoing">
    <special-message message="List of the currently ongoing events." />
    <events-box
      :events="events"
      sort-by="end"
      empty-message="No events tracked."
    />
  </div>
</template>

<script>
import EventsBox from "@/components/EventsBox";
import { load_rumors } from "../helpers/load_data";
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
