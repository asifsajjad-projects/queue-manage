const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './packages/auth/src/clientEntry.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/auth'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};