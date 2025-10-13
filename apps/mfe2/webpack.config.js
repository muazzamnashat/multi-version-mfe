
const path = require('path');
const mf = require('@angular-architects/module-federation/webpack');
const { withModuleFederationPlugin, shareAll } = mf;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'), // path to Nx root tsconfig
  ['@shared/ng-ui']
);

const base = withModuleFederationPlugin({
  name: 'mfe2',
  filename: 'remoteEntry.js',
  exposes: { './web-components': './src/bootstrap.ts' },
  shared: {
    // Angular & rxjs singletons:
    ...shareAll({ singleton: false, strictVersion: true, requiredVersion: 'auto' }), //false because we are running different versions of angular
    // Add descriptors for your mapped libs so share keys match import specifiers:
    ...sharedMappings.getDescriptors(),
  },
  // IMPORTANT: do NOT also pass `sharedMappings: ['@shared/ng-ui']` here
});

// Merge aliases and the SharedMappings plugin exactly once
module.exports = {
  ...base,
  resolve: {
    ...(base.resolve || {}),
    alias: {
      ...((base.resolve && base.resolve.alias) || {}),
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    ...(base.plugins || []),
    sharedMappings.getPlugin(),
  ],
};
