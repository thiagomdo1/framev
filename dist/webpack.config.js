var path = require("path");
var CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
function config(mode) {
    return {
        devtool: mode === "development" ? "source-map" : false,
        stats: "errors-only",
        mode: mode,
        entry: { framev: "./index.ts" },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist/browser"),
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
module.exports = function (env, argv) {
    return config(argv.mode || "development");
};
