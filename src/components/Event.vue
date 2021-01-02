<template>
  <div class="single-event">
    <span v-html="adjustedTitle" />
    <p>- {{ eventMessage }}</p>
    <span class="event-date">{{ dateString }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: Date,
    expires: Date,
    dateToUse: String
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
    },
    dateString() {
      let date;
      if (this.dateToUse === "begin") {
        date = this.date;
      } else if (this.dateToUse === "end") {
        date = this.expires;
      } else {
        return Error("Invalid type: please use only 'begin' or 'end'");
      }
      return date.toDateString();
    },
    eventMessage() {
      if (this.dateToUse === "begin") {
        return "Starts on";
      } else if (this.dateToUse === "end") {
        return "Ends on";
      } else {
        return Error("Invalid type: please use only 'begin' or 'end'");
      }
    }
  }
};
</script>

<style>
.single-event * {
  display: inline-block;
  padding: 0 2px;
}

.event-date {
  color: #ffc361;
}
</style>
