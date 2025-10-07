const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  library: { type: "module" },
  name: 'mfe2',
  filename: "remoteEntry.js",
  exposes: {
    './Module': './src/app/mfe2/mfe2.module.ts',
  },


  shared: {
    // ...shareAll({ singleton: false, strictVersion: true, requiredVersion: 'auto' }),
    // "@angular/common"           : { singleton: true, strictVersion: true, requiredVersion: '19.2.0' },
    // ...["@angular/common",'@angular/core', '@angular/router']
  },

});
