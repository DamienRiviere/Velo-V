const path = require("path");

module.exports = {
    entry: {
      app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true
    },
    module: {
        rules: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loaders: 'babel-loader',
          query: {
              presets: ['@babel/env']
          }
      }]
    }
}