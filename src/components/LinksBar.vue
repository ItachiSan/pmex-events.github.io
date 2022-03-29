<template>
  <header>
    <ul>
      <router-link to="/" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :active="isActive">
          <b>Home</b>
        </li>
      </router-link>
      <router-link to="/ongoing" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :active="isActive">
          <b>Ongoing Events</b>
        </li>
      </router-link>
      <router-link to="/rumors" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :active="isActive">
          <b>Incoming Events</b>
        </li>
      </router-link>
      <router-link to="/official" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :active="isActive">
          <b>Official Announcements</b>
        </li>
      </router-link>
      <router-link to="/past" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :active="isActive">
          <b>Past Events</b>
        </li>
      </router-link>
      <li @click="redirect('discord')">
        <b>Discord</b>
        <!-- Icons cannot be handled from Webpack, it seems... -->
        <img class="icon" src="@/assets/discord.png" />
      </li>
      <li @click="redirect('reddit')">
        <b>Reddit</b>
        <img class="icon" src="@/assets/reddit.png" />
      </li>
      <li @click="redirect('twitterjp')">
        <b>Twitter JP</b>
        <img class="icon" src="@/assets/twitter.png" />
      </li>
      <li @click="redirect('twitteren')">
        <b>Twitter EN</b>
        <img class="icon" src="@/assets/twitter.png" />
      </li>
      <li @click="redirect('website')">
        <b>Official Website</b>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    redirect(keyword) {
      switch (keyword) {
        case "website":
          window.open("https://pokemonmasters-game.com/en-US");
          break;
        case "discord":
          window.open("https://discord.gg/pokemonmasters");
          break;
        case "reddit":
          window.open("https://www.reddit.com/r/PokemonMasters/");
          break;
        case "twitteren":
          window.open("https://twitter.com/PokemonMasters");
          break;
        case "twitterjp":
          window.open("https://twitter.com/pokemas_game");
          break;
        default:
          alert(`Invalid redirection key: ${keyword}!`);
      }
    },
  },
};
</script>

<style>
header {
  background-image: linear-gradient(to bottom right, #fbac76, #f97f2c);
  width: 100%;
  text-align: center;
}

@media screen and (min-width: 1200px) {
  header {
    position: fixed;
  }

  ul {
    display: flex;
    justify-content: center;
  }
}

li {
  color: white;
  display: inline-block;
  padding: 13px;
  margin: 5px 0;
  transition: all 1s;
  transition-property: background-color, color;
  border-width: 0px 3px 0px 0px;
  border-color: #fbac76;
  border-style: solid;
}

li:last-child {
  border-width: 0;
}

header li:hover {
  background-color: white;
  color: #f97f2c;
  cursor: pointer;
}

li[active="true"] {
  background-color: white;
  color: #f97f2c;
}

.icon {
  width: 15px;
  height: 15px;
}
</style>
