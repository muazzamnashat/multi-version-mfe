const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  library: { type: "module" },
  name: 'mfe',
  filename: "remoteEntry.js",
  exposes: {
    './Module': './src/app/mfe/mfe-module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // "@angular/common" : { singleton: true, strictVersion: true, requiredVersion: '20.3.3' }
    // "@angular/router" : { singleton: false, strictVersion: true, requiredVersion: '20.3.3' },
    // ...['@angular/core', '@angular/common']
    // ...['@angular/core', '@angular/common', '@angular/router']
  },

});


// const config = withModuleFederationPlugin({
//   library: { type: "module" },
//   name: "retailersApp",
//   filename: "remoteEntry.js",
//   exposes: { './Module': './apps/retailers/src/client/src/app/retailers/retailers.module.ts' },
//   shared: share(sharedModules)
// });