const path= require('path');

module.exports = {
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
  target: 'web',
  output: {
    filename: 'conwayslife.js',
    library: 'ConwaysLife',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
  },
};