const path = require('path');

module.exports = {
  // Entry point: The main file that kicks off your script
  entry: {
    content: './src/content.ts',
    popup: './src/popup.ts',
    background: './src/background.ts',
  },

  // Output: Where the bundled file goes
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  // File resolution rules
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // How to handle different file types
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  // Disable optimization if you need to debug the output file easily
  // optimization: { minimize: false },
};
