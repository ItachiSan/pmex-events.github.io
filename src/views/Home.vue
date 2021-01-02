<template>
  <events-box
    date-to-use="begin"
    :empty-message="longMessage"
    :events="events"
  />
</template>

<script>
import EventsBox from "@/components/EventsBox";

export default {
  components: {
    EventsBox
  },
  data() {
    return {
      events: [],
      longMessage:
        "Use one of the above buttons for viewing events or reaching other websites."
    };
  }
};
</script>
