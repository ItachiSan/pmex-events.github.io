<template>
  <div id="past">
    <special-message
      message="This page reports all the completed events for the current and previous year quarter."
    />
    <events-box
      :events="events"
      sort-by="end"
      skip-sort
      skip-special
      empty-message="No new official announcements."
    />
  </div>
</template>

<script>
import { load_rumors } from "@/helpers/load_data";
import EventsBox from "@/components/EventsBox.vue";
import SpecialMessage from "@/components/SpecialMessage.vue";

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
        // Remove the ongoing rumors
        rumors => {
          let now = new Date(Date.now());
          return (
            rumors
              .filter(event => event.expires < now)
              // Thanks to "skipSort" we can sort stuff manually! So here we put newest to olders
              .sort((a, b) => b.expires - a.expires)
          );
          // Return only the last 50 events
          //.slice(0, 50);
        }
      )
      .then(rumors => {
        this.events = rumors;
      });
  }
};
</script>
