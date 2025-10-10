const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const config = withModuleFederationPlugin({
  name: 'mfe2',
  filename: "remoteEntry.js",
  exposes: {
    './web-components': './src/bootstrap.ts',
  },
  shared: {
    ...shareAll({ singleton: false, strictVersion: true, requiredVersion: 'auto' }),
    '@shared/ng-ui': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      import: 'shared/src/index',
    }
  }
});

console.log(config);

module.exports = config;