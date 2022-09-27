module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },

  pwa: {
    name: "Pokémon Masters EX Events",
    themeColor: "#f97f2c",
    msTileColor: "#363434",
    manifestOptions: {
      background_color: "#363434",
    },
    // Thanks: https://stackoverflow.com/a/54377386
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
