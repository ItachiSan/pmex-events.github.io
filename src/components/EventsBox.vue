<template>
  <div :id="id" class="events-box">
    <!-- Special event counter -->
    <event-counter
      v-if="specialEvent"
      :title="specialEvent.title"
      :date="specialEvent.date"
      :expires="specialEvent.expires"
    />
    <br v-if="specialEvent" />
    <hr v-if="specialEvent" />
    <br v-if="specialEvent" />
    <!-- Normal events -->
    <event
      v-for="event in sortedEvents"
      :key="event.name"
      :title="event.title"
      :date="event.date"
      :expires="event.expires"
      :date-to-use="sortBy"
    >
    </event>
    <!-- Fallback box -->
    <div v-if="sortedEvents.length === 0">
      <p>{{ emptyMessage }}</p>
      <br />
      <hr />
      <br />
    </div>
  </div>
</template>

<script>
import Event from "@/components/Event";
import EventCounter from "./EventCounter.vue";
import { compare_dates } from "@/helpers/sorting";

export default {
  components: { Event, EventCounter },
  name: "EventsBox",
  props: {
    id: String,
    specialEvent: Object,
    events: Array,
    sortBy: String,
    filterDates: String,
    emptyMessage: String
  },
  computed: {
    sortedEvents() {
      // Now sort them accordingly
      let criteria = this.sortBy;
      let result = [...this.events];
      result = result.sort((a, b) => compare_dates(a, b, criteria));

      return result;
    }
  }
};
</script>

<style>
.events-box {
  background-color: rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-top: 100px;
  display: inline-block;
  color: white;
  border-style: solid;
  border-color: #fbac76;
  border-radius: 2px;
}

hr {
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
</style>
