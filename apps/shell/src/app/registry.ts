import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry = {
    mfe: () => loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        remoteName: 'mfe',
        exposedModule: './web-components'
    })
};
