const webpack = require("webpack");
const path = require("path");

const config = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.min.js",
    library: "bota",
  },
  /*
  entry: './src/index.js',
  output: {
    
    filename: 'index.js',
    library: "Bota",
  },*/
  resolve: {
    modules: [
      "node_modules",
      path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules"),
    ],
  },
  resolveLoader: {
    modules: [
      "node_modules",
      path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules|cdn_modules/,
      },
    ],
  },
};

module.exports = config;
