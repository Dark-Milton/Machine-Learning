"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommands = void 0;
const CommandIDs = {
    upload: 'vertexai:upload-custom-model',
};
/**
 * Registers new commands to Jupyterlab and adds them to the
 * context menu.
 */
function addCommands(app, factory, uploadCustomModelsWidget) {
    const { commands } = app;
    const { tracker } = factory;
    const widget = tracker.currentWidget;
    commands.addCommand(CommandIDs.upload, {
        execute: () => {
            if (!widget)
                return;
            // Emits signal to open drawer
            uploadCustomModelsWidget.filePath = getLocalPath();
            uploadCustomModelsWidget.isOpen = true;
        },
        iconClass: 'jp-MaterialIcon jp-FileUploadIcon',
        isVisible: () => isValidModelPath(getLocalPath()),
        label: 'Upload Custom Model',
        mnemonic: 0,
    });
    app.contextMenu.addItem({
        command: CommandIDs.upload,
        selector: '.jp-DirListing-item[data-isdir="false"]',
        rank: 14,
    });
    function getLocalPath() {
        if (!widget)
            return undefined;
        const model = widget.selectedItems().next();
        if (!model) {
            return undefined;
        }
        return widget.model.manager.services.contents.localPath(model.path);
    }
    function isValidModelPath(path) {
        if (!widget || !path) {
            return false;
        }
        const validModelPaths = [
            'saved_model.pb',
            'model.pkl',
            'model.joblib',
            'model.bst',
        ];
        return validModelPaths.includes(path.split('/').pop() || '');
    }
}
exports.addCommands = addCommands;
