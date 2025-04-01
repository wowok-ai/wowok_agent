const path = require('path');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      "fs": path.resolve(__dirname, './empty.ts'),
      "os": path.resolve(__dirname, './empty.ts'),
      "path": path.resolve(__dirname, './empty.ts'),
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',  
    globalObject: 'this'   
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/wowok/src')
        ],
        use: {
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true
          }
        },
      },
    ],
  }
};
