const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function config(mode) {
  return {
    devtool: mode === "development" ? "source-map" : false,
    stats: "errors-only",
    mode,

    entry: "./index.js",

    output: {
      filename: "iframev.min.js",
      path: path.resolve(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/example/index.html",
        publicPath: "./",
      }),
      new HtmlWebpackPlugin({
        filename: "iframe1.html",
        template: "./src/example/iframe1.html",
        publicPath: "./",
      }),
      new HtmlWebpackPlugin({
        filename: "iframe2.html",
        template: "./src/example/iframe2.html",
        publicPath: "./",
      }),
    ],
  };
}

module.exports = (env, argv) => {
  return config(argv.mode || "development");
};
