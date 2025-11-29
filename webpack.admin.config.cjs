const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  // client
  {
    mode: 'development',
    entry: path.resolve(__dirname, 'packages', 'admin', 'src', 'clientEntry.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist', 'admin'),
      filename: 'client.bundle.js',
      publicPath: '/static/admin/'
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
    entry: path.resolve(__dirname, 'packages', 'admin', 'src', 'serverEntry.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist', 'admin'),
      filename: 'server.bundle.cjs',
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
