const path = require("path");
module.exports = {
  resolve: {
    alias: {
      "./images/layers.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers.png"
      ),
      "./images/layers-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers-2x.png"
      ),
      "./images/marker-icon.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon.png"
      ),
      "./images/marker-icon-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon-2x.png"
      ),
      "./images/marker-shadow.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-shadow.png"
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
      {
        test: /\.scss$/,
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          syntax: "postcss-scss",
          plugins: () => [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
          ],
        },
      },
    ],
  },
};
