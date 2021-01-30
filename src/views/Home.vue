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
      longMessage: `
        Use one of the above buttons for viewing events or reaching other websites.
        <br><br>
        You can also check the source code of this project
        <a href="https://github.com/ItachiSan/pmex-events">here</a>.
      `
    };
  }
};
</script>
