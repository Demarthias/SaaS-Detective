const path = require('path');

// No more DefinePlugin/.env indirection for PostHog config — analytics.ts
// and shared.js both hardcode the same public project token and proxy URL
// directly, so a build can no longer silently ship with the wrong host
// (see the comment in src/analytics.ts for why that mattered).
module.exports = {
  entry: {
    popup: './src/popup.ts',
    background: './src/background.ts',
    content: './src/content.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
