const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const config = withModuleFederationPlugin({
  name: 'mfe2',
  filename: 'remoteEntry.js',
  exposes: {
    './web-components': './src/bootstrap.ts'
  },
  shared: {
    '@shared/ng-ui': {
      singleton: true,
      requiredVersion: 'auto',
      import: 'shared/src/index',
    },
    ...shareAll({ singleton: false, strictVersion: true, requiredVersion: 'auto' })
  }

});

console.log(config);

module.exports = config;