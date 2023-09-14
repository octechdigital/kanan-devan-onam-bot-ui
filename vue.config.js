module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false, // INFO: set to eval-source-map for debugging. Added unsafe-eval to csp meta tag and nginx config on dev
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
};
