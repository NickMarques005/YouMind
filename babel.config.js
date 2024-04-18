module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv"],
      ['react-native-reanimated/plugin']
      [
      'module-resolver', {
        root: ['./src'],
        alias: {
          '@assets': './assets',
          '@components': './components',
          '@providers': './providers',
          'types': './types',
          '@services': './services',
          '@hooks': './hooks',
          '@utils': './utils',
          '@features': './features',
          '@navigation': './navigation',
        }
      }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    }
  }
};
