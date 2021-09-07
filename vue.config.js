module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/pmex-events/" : "/",
  configureWebpack: {
    devtool: "source-map"
  },

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Pokémon Masters Events";
      return args;
    });
  },

  pwa: {
    name: "Pokémon Masters EX Events",
    themeColor: "#f97f2c",
    msTileColor: "#363434",
    manifestOptions: {
      background_color: "#363434"
    },
    // Thanks: https://stackoverflow.com/a/54377386
    workboxOptions: {
      skipWaiting: true
    }
  }
};
