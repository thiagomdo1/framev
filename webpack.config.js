const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function config(mode) {
  return {
    devtool: mode === "development" ? "source-map" : false,
    stats: "errors-only",
    mode,

    entry: { framev: "./index.ts" },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },

    resolve: { extensions: [".ts"] },

    plugins: [new CleanWebpackPlugin()],
  };
}

module.exports = (env, argv) => {
  return config(argv.mode || "development");
};
