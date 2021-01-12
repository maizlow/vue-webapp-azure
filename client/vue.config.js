const path = require("path");

module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
      proxy: {
        "/api": {
          target: "http://localhost:7071",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
};
