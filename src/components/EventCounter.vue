<template>
  <div class="single-event-counter">
    <b
      v-for="title in adjustedTitles"
      :key="title"
      v-html="title"
      class="counter-title"
    />
    <span class="small-date">
      <i v-if="date">{{ date.toDateString() }}</i>
      <i v-else>TBA</i>
    </span>
    <br />
    <span class="counter-date"
      >{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</span
    >
  </div>
</template>

<script>
export default {
  props: {
    titles: Array[String],
    begin: Date,
    end: Date,
    show: String
  },
  data() {
    return { days: "...", hours: "...", minutes: "...", seconds: "..." };
  },
  computed: {
    date() {
      switch (this.show) {
        case "begin":
          return this.begin;
        case "end":
          return this.end;
        default:
          return Error;
      }
    },
    // TODO: Try to use `require()`
    adjustedTitles() {
      return this.titles.map(title =>
        title
          .replace(/\[grid\]/g, '<img src="./img/grid.png"/>')
          .replace(/\[EX\]/g, '<img src="./img/ex.png"/>')
          .replace(
            /\[gridEX\]/g,
            '<img src="./img/grid.png"/><img src="./img/ex.png"/>'
          )
      );
    }
  },
  methods: {
    countdown() {
      // console.log("Counting down!");
      let now = new Date(Date.now());
      // Handle undefined dates
      if (this.date === null) {
        this.days = "?";
        this.hours = "?";
        this.minutes = "?";
        this.seconds = "?";
        return;
      }
      let difference = this.date - now;
      let difference_in_seconds = difference / 1000;
      // Extract days
      this.days = Math.floor(difference_in_seconds / (60 * 60 * 24));
      difference_in_seconds = difference_in_seconds - this.days * 60 * 60 * 24;
      // Extract hours
      this.hours = Math.floor(difference_in_seconds / (60 * 60));
      difference_in_seconds = difference_in_seconds - this.hours * 60 * 60;
      // Extract minutes
      this.minutes = Math.floor(difference_in_seconds / 60);
      difference_in_seconds = difference_in_seconds - this.minutes * 60;
      // Extract seconds
      this.seconds = Math.floor(difference_in_seconds);
    }
  },
  created() {
    this.countdown();
  },
  mounted() {
    setInterval(this.countdown, 1000);
  },
  destroyed() {
    clearInterval(this.countdown);
  }
};
</script>

<style>
.single-event-counter * {
  display: inline-block;
  padding: 2px;
}

.counter-title {
  display: block;
}

.small-date {
  font-size: 10px;
}

.counter-date {
  color: #ffc361;
  font-size: 50px;
}
</style>
