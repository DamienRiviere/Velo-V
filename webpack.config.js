const path = require("path");

module.exports = {
    mode: "production",
    watch: true,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true
    }
}