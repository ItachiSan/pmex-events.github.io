<template>
  <div id="app">
    <links-bar />

    <router-view id="events" />
  </div>
</template>

<script>
import LinksBar from "@/components/LinksBar.vue";

export default {
  components: {
    LinksBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Verdana;
}

body {
  background-color: #363434;
  text-align: center;
}
</style>
