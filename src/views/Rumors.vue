<template>
  <div id="rumors">
    <events-box
      id="other-rumors"
      :special-event="next_event"
      :events="other_events"
      sort-by="begin"
      filter-dates="future"
      empty-message="No rumors yet."
    />
  </div>
</template>

<script>
import { load_rumors } from "@/helpers/load_data";
import EventsBox from "@/components/EventsBox";

export default {
  components: {
    EventsBox
  },
  data() {
    return { next_event: null, other_events: [] };
  },
  mounted() {
    load_rumors()
      .then(
        // Remove the ongoing rumors
        rumors => {
          let now = new Date(Date.now());
          return rumors.filter(event => event.date >= now);
        }
      )
      .then(rumors => {
        if (rumors.length > 0) {
          this.next_event = rumors[0];
          this.other_events = rumors.slice(1);
        } else {
          this.events = rumors;
        }
      });
  }
};
</script>
