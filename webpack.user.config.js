const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  // client
  {
    mode: 'development',
    entry: path.resolve(__dirname, 'packages', 'user', 'src', 'clientEntry.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist', 'user'),
      filename: 'client.bundle.js',
      publicPath: '/static/user/'
    },
    module: {
      rules: [
        { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ]
    },
    resolve: { extensions: ['.js', '.jsx'] }
  },
  // server
  {
    mode: 'development',
    entry: path.resolve(__dirname, 'packages', 'user', 'src', 'serverEntry.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist', 'user'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
      ]
    },
    resolve: { extensions: ['.js', '.jsx'] }
  }
];
