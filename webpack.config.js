const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

function loadEnv() {
  try {
    return Object.fromEntries(
      fs.readFileSync(path.join(__dirname, '.env'), 'utf8')
        .split('\n')
        .filter(l => l.trim() && !l.startsWith('#'))
        .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
        .filter(([k]) => k)
    );
  } catch (_) { return {}; }
}
const env = loadEnv();

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.POSTHOG_PROJECT_TOKEN': JSON.stringify(env.POSTHOG_PROJECT_TOKEN || ''),
      'process.env.POSTHOG_HOST': JSON.stringify(env.POSTHOG_HOST || 'https://api.venom-industries.com'),
    }),
  ],
};
