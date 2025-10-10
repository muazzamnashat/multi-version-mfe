
// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// const config = withModuleFederationPlugin({
//   library: { type: "module" },
//   name: 'mfe',
//   filename: "remoteEntry.js",
//   exposes: {
//     './Module': './src/app/mfe/mfe-module.ts',
//   },
//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//     "@shared/ng-ui": {
//       singleton: true,
//       strictVersion: false,
//       requiredVersion: 'auto',
//       import: 'shared/src/index',
//     }
//   }
// });

// module.exports = config;


const path = require('path');
const mf = require('@angular-architects/module-federation/webpack');
const { withModuleFederationPlugin, shareAll } = mf;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'), // path to Nx root tsconfig
  ['@shared/ng-ui']
);

const base = withModuleFederationPlugin({
  library: { type: 'module' },
  name: 'mfe',
  filename: 'remoteEntry.js',
  exposes: { './Module': './src/app/mfe/mfe-module.ts' },
  shared: {
    // Angular & rxjs singletons:
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
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
