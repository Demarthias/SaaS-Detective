const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// PostHog config is no longer injected here — analytics.ts and shared.js both
// hardcode the same public project token and proxy URL directly, so a build can
// no longer silently ship with the wrong host (see the comment in
// src/analytics.ts for why that mattered).
//
// TRUST_CHECK_SHARED_SECRET stays on the .env/DefinePlugin path, and must not
// be hardcoded the way the PostHog token was. That token is a public client
// identifier and is meant to be readable in shipped code; this one is a real
// shared secret checked by the Worker's /trust-check route, so inlining it
// would commit a secret to the repo. It has no safe default: if .env is
// missing, the key compiles to '' and every /trust-check returns 401, which
// surfaces as Trust Score silently rendering nothing.
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

if (!env.TRUST_CHECK_SHARED_SECRET) {
  console.warn(
    '\n  WARNING: TRUST_CHECK_SHARED_SECRET is not set in .env.\n' +
    '  This build will ship with an empty trust key and Checkout Trust Score\n' +
    '  will fail closed (401) for every user.\n'
  );
}

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
      'process.env.TRUST_CHECK_SHARED_SECRET': JSON.stringify(env.TRUST_CHECK_SHARED_SECRET || ''),
    }),
  ],
};
