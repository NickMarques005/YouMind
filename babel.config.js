module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      ["react-native-reanimated/plugin"],
      [
      "module-resolver", {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@providers': './src/providers',
          'types': './src/types',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@__firebase__': './src/__firebase__'
        }
      }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    }
  };
};
