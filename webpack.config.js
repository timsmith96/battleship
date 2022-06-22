const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/gameloop.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
