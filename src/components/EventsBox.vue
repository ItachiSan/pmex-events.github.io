<template>
  <div :id="id" class="events-box">
    <!-- Special event counter -->
    <event-counter
      v-if="specialEvent"
      :titles="specialEvent.titles"
      :begin="specialEvent.date"
      :end="specialEvent.expires"
      :show="sortBy"
    />
    <br v-if="specialEvent" />
    <hr v-if="specialEvent" />
    <br v-if="specialEvent" />
    <!-- Normal events -->
    <event
      v-for="event in otherEvents"
      :key="event.name"
      :title="event.title"
      :date="event.date"
      :expires="event.expires"
      :date-to-use="sortBy"
    >
    </event>
    <!-- Fallback box -->
    <div v-if="sortedEvents.length === 0">
      <p v-html="emptyMessage" />
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
    events: Array,
    sortBy: String,
    skipSort: Boolean,
    skipSpecial: Boolean,
    emptyMessage: String
  },
  computed: {
    sortedEvents() {
      // Now sort them accordingly
      let criteria = this.sortBy;
      let result = [...this.events];
      if (!this.skipSort)
        result = result.sort((a, b) => compare_dates(a, b, criteria));

      return result;
    },
    specialEvent() {
      if (this.sortedEvents.length < 1) return null;
      if (this.skipSpecial) return null;

      let criteria = this.sortBy;
      let result = { ...this.sortedEvents[0] };

      // Prepare the special event(s) with the counter
      result.titles = [result.title];

      let event_index = 1;
      let event_to_check = this.sortedEvents[event_index];

      while (
        event_to_check &&
        compare_dates(event_to_check, result, criteria) <= 0
      ) {
        result.titles.push(event_to_check.title);
        event_index += 1;
        event_to_check = this.sortedEvents[event_index];
      }

      return result;
    },
    otherEvents() {
      if (!this.specialEvent) return this.sortedEvents;
      return this.sortedEvents.slice(this.specialEvent.titles.length);
    }
  }
};
</script>

<style>
.events-box {
  background-color: rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-top: 20px;
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
