<template>
  <span id="special-message" class="special-message">
    {{ message }}
  </span>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style>
.special-message {
  margin-top: 20px;
  color: white;
  display: inline-block;
  padding: 10px;
  width: 90%;
}

@media screen and (min-width: 1200px) {
  .special-message {
    margin-top: 80px;
  }
}
</style>
