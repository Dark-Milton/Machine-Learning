"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommands = void 0;
const algorithm_1 = require("@lumino/algorithm");
const apputils_1 = require("@jupyterlab/apputils");
const GCS_URI_PREFIX = 'gs://';
/**
 * The command IDs used by the file browser plugin.
 */
const CommandIDs = {
    copyGCSURI: 'gcsfilebrowser:copy-gcs-uri',
    del: 'gcsfilebrowser:delete',
    rename: 'gcsfilebrowser:rename',
    copy: 'gcsfilebrowser:copy',
    cut: 'gcsfilebrowser:cut',
    duplicate: 'gcsfilebrowser:duplicate',
    paste: 'gcsfilebrowser:paste',
    open: 'gcsfilebrowser:open',
    download: 'gcsfilebrowser:download',
    createNewDirectory: 'gcsfilebrowser:create-new-directory',
};
function addCommands(app, factory) {
    const { docRegistry: registry, commands } = app;
    const { tracker } = factory;
    commands.addCommand(CommandIDs.open, {
        execute: args => {
            const factory = args['factory'] || void 0;
            const widget = tracker.currentWidget;
            if (!widget) {
                return;
            }
            const { contents } = widget.model.manager.services;
            return Promise.all(algorithm_1.toArray(algorithm_1.map(widget.selectedItems(), item => {
                if (item.type === 'directory') {
                    const localPath = contents.localPath(item.path);
                    return widget.model.cd(`/${localPath}`);
                }
                return commands.execute('docmanager:open', {
                    factory: factory,
                    path: item.path,
                });
            })));
        },
        iconClass: args => {
            const factory = args['factory'] || void 0;
            if (factory) {
                // if an explicit factory is passed...
                const ft = registry.getFileType(factory);
                if (ft) {
                    // ...set an icon if the factory name corresponds to a file type name...
                    return ft.iconClass || '';
                }
                else {
                    // ...or leave the icon blank
                    return '';
                }
            }
            else {
                return 'jp-MaterialIcon jp-FolderIcon';
            }
        },
        label: args => (args['label'] || args['factory'] || 'Open'),
        mnemonic: 0,
    });
    commands.addCommand(CommandIDs.copyGCSURI, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (!widget) {
                return;
            }
            const localPath = widget.model.manager.services.contents.localPath(widget.selectedItems().next().path);
            apputils_1.Clipboard.copyToSystem(GCS_URI_PREFIX + localPath);
        },
        iconClass: 'jp-MaterialIcon jp-CopyIcon',
        label: 'Copy GCS URI (gs://)',
        mnemonic: 0,
    });
    const selectorItem = '.jp-GCSFilebrowser .jp-DirListing-item';
    app.contextMenu.addItem({
        command: CommandIDs.copyGCSURI,
        selector: selectorItem,
        rank: 7,
    });
}
exports.addCommands = addCommands;
