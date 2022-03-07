const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const generalConfig = {
  mode: 'production',
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

const browserOutputConfig = {
  library: 'ConwaysLife',
  libraryTarget: 'umd',
  libraryExport: 'default',
  globalObject: 'this',
  umdNamedDefine: true,
  path: path.resolve(__dirname, 'dist/browser'),
}

const nodeOutputConfig = {
  path: path.resolve(__dirname, 'dist/node'),
  libraryTarget: 'umd',
  libraryExport: 'default',
}

const minConfig = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ],
  }
};

module.exports = (env, argv) => {
  // non-min node lib
  let node = Object.assign({}, generalConfig);
  node.target = 'node';
  node.output = Object.assign({}, nodeOutputConfig);
  node.output.filename = 'ConwaysLife.js';

  // min node lib
  let nodeMin = Object.assign({}, node, minConfig);
  nodeMin.output = Object.assign({}, nodeOutputConfig);
  nodeMin.output.filename = 'ConwaysLife.min.js';

  // non-min browser lib
  let browser = Object.assign({}, generalConfig);
  browser.target = 'web';
  browser.output = Object.assign({}, browserOutputConfig);
  browser.output.filename = 'ConwaysLife.js';

  // min browser lib
  let browserMin = Object.assign({}, browser, minConfig);
  browserMin.output = Object.assign({}, browserOutputConfig);
  browserMin.output.filename = 'ConwaysLife.min.js';

  // min browser demo page
  let browserMinDemo = Object.assign({}, browserMin);
  browserMinDemo.output = Object.assign({}, browserMin.output);
  browserMinDemo.output.path = path.resolve(__dirname, 'public/lib');

  return [node, nodeMin, browser, browserMin, browserMinDemo];
};