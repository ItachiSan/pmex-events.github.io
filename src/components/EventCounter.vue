<template>
  <div class="single-event-counter">
    <b v-html="adjustedTitle" />
    <br />
    <span class="small-date">
      <i>{{ date.toDateString() }}</i>
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
    title: String,
    date: Date,
    expires: Date
  },
  data() {
    return { days: "...", hours: "...", minutes: "...", seconds: "..." };
  },
  computed: {
    // TODO: Try to use `require()`
    adjustedTitle() {
      return this.title
        .replace(/\[grid\]/g, '<img src="./img/grid.png"/>')
        .replace(/\[ex\]/g, '<img src="./img/ex.png"/>')
        .replace(
          /\[gridEX\]/g,
          '<img src="./img/grid.png"/><img src="./img/ex.png"/>'
        );
    }
  },
  methods: {
    countdown() {
      // console.log("Counting down!");
      let now = new Date(Date.now());
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

.small-date {
  font-size: 10px;
}

.counter-date {
  color: #ffc361;
  font-size: 50px;
}
</style>
