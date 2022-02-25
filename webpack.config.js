const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const generalConfig = {
  mode: 'development',
  entry: './src/ConwaysLife.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

const browserConfig = {
  target: 'web',
  output: {
    library: 'ConwaysLife',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist/browser'),
  },
}

const nodeConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/node'),
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
}

const minConfig = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};

module.exports = (env, argv) => {
  let node = {};
  Object.assign(node, generalConfig, nodeConfig);
  node.output.filename = 'ConwaysLife.js';

  let nodeMin = {};
  Object.assign(nodeMin, node, minConfig);
  node.output.filename = 'ConwaysLife.min.js';

  let browser = {};
  Object.assign(browser, generalConfig, browserConfig);
  node.output.filename = 'ConwaysLife.js';

  let browserMin = {};
  Object.assign(browserMin, browser, minConfig);
  node.output.filename = 'ConwaysLife.min.js';

  return [node, nodeMin, browser, browserMin];
};