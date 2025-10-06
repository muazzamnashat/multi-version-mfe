// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   name: 'mfe',
//   filename: 'remoteEntry.js',

//   exposes: {
//     './App': './apps/mfe/src/app/app.ts',
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },

// });

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

    module.exports = {
      output: {
        publicPath: "http://localhost:3000/",
        uniqueName: "mfe"
      },
      optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
      },
      plugins: [
        new ModuleFederationPlugin({
          
            // For remotes (please adjust)
            name: "mfe",
            library: { type: "var", name: "mfe" },
            filename: "remoteEntry.js",
            exposes: {
                './web-components': './apps/mfe/src/bootstrap.ts',
            },        
           
            // For hosts (please adjust)
            /*
            remotes: {
                'mfe1': "mfe1@http://localhost:3000/remoteEntry.js" 
            },
            */

           shared: ["@angular/core", "@angular/common", "@angular/router"]
          })
      ],
    };

