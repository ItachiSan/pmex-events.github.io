<template>
  <events-box
    id="home"
    class="home-box"
    date-to-use="begin"
    :empty-message="longMessage"
    :events="events"
  />
</template>

<script>
import EventsBox from "@/components/EventsBox.vue";

export default {
  components: {
    EventsBox,
  },
  data() {
    return {
      events: [],
      longMessage: `
        Warning: The app is discontinued and is not updated anymore.
        Please use the <a href="https://pm-events.github.io/">other event tracker</a>.
        <br><br>
        Use one of the above buttons for viewing events or reaching other websites.
        <br><br>
        You can also check the source code of this project
        <a href="https://github.com/ItachiSan/pmex-events">here</a>.
      `,
    };
  },
};
</script>

<style>
/*
Override the top margin with a bigger one, as we have no special message in this page.
*/
.home-box {
  margin-top: 100px;
}
</style>
