const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfe2',
  filename: "remoteEntry.js",
  exposes: {
    './web-components': './src/bootstrap.ts',
  },
  shared: {
    ...shareAll({ singleton: false, strictVersion: true, requiredVersion: 'auto' })
  },
});
