const path = require("path");

module.exports = {
    entry: {
      app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
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