<template>
  <header>
    <ul>
      <router-link tag="li" to="/"><b>Home</b></router-link>
      <router-link tag="li" to="/ongoing"><b>Ongoing Events</b></router-link>
      <router-link tag="li" to="/rumors"><b>Incoming Events</b></router-link>
      <router-link tag="li" to="/official">
        <b>Official Announcements</b>
      </router-link>
      <router-link tag="li" to="/past"><b>Past Events</b></router-link>
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

.active,
.router-link-exact-active {
  background-color: white;
  color: #f97f2c;
}

.icon {
  width: 15px;
  height: 15px;
}
</style>
