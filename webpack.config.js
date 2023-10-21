const path = require('path');
const webpack = require('webpack');

module.exports = () => ({
  mode: 'production',
  entry: {
    // Each entry in here would declare a file that needs to be transpiled
    // and included in the extension source.
    // For example, you could add a background script like:
    // background: './src/background.js',
    content: './src/content.js',
    options: './src/options.web.js',
    background: './src/background.js',
  },
  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
    path: path.join(__dirname, 'extension/dist'),
    filename: '[name].js',
  },
  module: {
    // This transpiles all code (except for third party modules) using Babel.
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.join(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
          },
        ],
      },
    ],
  },
  resolve: {
    // This allows you to import modules just like you would in a NodeJS app.
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    fallback: {
      "fs": false,
      "http": false,
      "https": false,
      "os": false,
      "path": false,
      "url": false
    }
  },
  plugins: [
    // Since some NodeJS modules expect to be running in Node, it is helpful
    // to set this environment var to avoid reference errors.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ProvidePlugin({
        process: 'process',
    })
  ],
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'source-map',
});
