import { ReactWidget, ToolbarButtonComponent, UseSignal } from '@jupyterlab/apputils';
import * as React from 'react';
import { cloneIcon } from '../style/icons';
import { CommandIDs } from '../tokens';
export function addCloneButton(model, filebrowser, commands) {
    filebrowser.toolbar.addItem('gitClone', ReactWidget.create(React.createElement(UseSignal, { signal: model.repositoryChanged, initialArgs: {
            name: 'pathRepository',
            oldValue: null,
            newValue: model.pathRepository
        } }, (_, change) => (React.createElement(ToolbarButtonComponent, { enabled: change.newValue === null, icon: cloneIcon, onClick: () => {
            commands.execute(CommandIDs.gitClone);
        }, tooltip: 'Git Clone' })))));
}
//# sourceMappingURL=gitClone.js.map