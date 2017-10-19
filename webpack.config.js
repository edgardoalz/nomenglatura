const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  },
  watch:true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'css-loader' ]
      }
    ]
  }
};