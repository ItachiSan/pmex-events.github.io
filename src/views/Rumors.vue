<template>
  <div id="rumors">
    <events-box
      id="rumors"
      :events="events"
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
    EventsBox,
  },
  data() {
    return { events: [] };
  },
  mounted() {
    load_rumors()
      .then(
        // Remove the ongoing rumors
        (rumors) => {
          let now = new Date(Date.now());
          return rumors.filter((event) => event.date >= now);
        }
      )
      .then((rumors) => {
        this.events = rumors;
      });
  },
};
</script>
