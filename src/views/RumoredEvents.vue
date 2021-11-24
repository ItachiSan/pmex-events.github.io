<template>
  <div id="rumors">
    <special-message
      message="List of the events recovered from the datamine."
    />
    <events-box
      :events="events"
      sort-by="begin"
      empty-message="No rumors yet."
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
    SpecialMessage,
  },
  data() {
    return { events: [] };
  },
  mounted() {
    let now = new Date(Date.now());
    load_rumors()
      .then(
        // Remove the ongoing rumors
        (rumors) =>
          rumors.filter((event) => event.date >= now || event.date === null)
      )
      .then((rumors) => (this.events = rumors));
  },
};
</script>
