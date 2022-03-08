const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const generalConfig = {
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

module.exports = (env, argv) => {
  // non-min node lib
  let node = Object.assign({}, generalConfig, {
    mode: 'development',
    target: 'node',
    output: Object.assign({}, nodeOutputConfig, {
      filename: 'ConwaysLife.js',
    }),
  });

  // min node lib
  let nodeMin = Object.assign({}, node, {
    mode: 'production',
    output: Object.assign({}, nodeOutputConfig, {
      filename: 'ConwaysLife.min.js',
    }),
  });

  // non-min browser lib
  let browser = Object.assign({}, generalConfig, {
    mode: 'development',
    target: 'web',
    output: Object.assign({}, browserOutputConfig, {
      filename: 'ConwaysLife.js',
    }),
  });

  // min browser lib
  let browserMin = Object.assign({}, browser, {
    mode: 'production',
    output: Object.assign({}, browserOutputConfig, {
      filename: 'ConwaysLife.min.js',
    }),
  });

  // min browser demo page
  let browserMinDemo = Object.assign({}, browserMin, {
    output: Object.assign({}, browserMin.output, {
      path: path.resolve(__dirname, 'public/lib'),
    }),
  });

  return [node, nodeMin, browser, browserMin, browserMinDemo];
};