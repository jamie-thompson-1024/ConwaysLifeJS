const path = require('path');

const general = {
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

const browser = {
  target: 'web',
  output: {
    filename: 'conwayslife.js',
    library: 'ConwaysLife',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist/browser'),
  },
}

const node = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/node'),
    filename: 'conwayslife.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
}

module.exports = (env, argv) => {
  Object.assign(node, general);
  Object.assign(browser, general);

  return [node, browser];
};