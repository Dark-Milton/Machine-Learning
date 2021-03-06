"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNbInGit = exports.diffNotebookGit = exports.diffNotebookCheckpoint = exports.diffNotebook = void 0;
const coreutils_1 = require("@jupyterlab/coreutils");
const services_1 = require("@jupyterlab/services");
const widget_1 = require("./widget");
const utils_1 = require("./utils");
function diffNotebook(args) {
    let { base, remote } = args;
    let widget = new widget_1.NbdimeWidget(args);
    widget.title.label = `Diff: ${base} ↔ ${remote}`;
    widget.title.caption = `Local: ${base}\nRemote: '${remote}'`;
    return widget;
}
exports.diffNotebook = diffNotebook;
function diffNotebookCheckpoint(args) {
    const { path, rendermime, hideUnchanged } = args;
    let nb_dir = coreutils_1.PathExt.dirname(path);
    let name = coreutils_1.PathExt.basename(path, '.ipynb');
    let base = coreutils_1.PathExt.join(nb_dir, name + '.ipynb');
    let widget = new widget_1.NbdimeWidget({
        base,
        rendermime,
        baseLabel: 'Checkpoint',
        hideUnchanged,
    });
    widget.title.label = `Diff checkpoint: ${name}`;
    widget.title.caption = `Local: latest checkpoint\nRemote: '${path}'`;
    widget.title.iconClass = 'fa fa-clock-o jp-fa-tabIcon';
    return widget;
}
exports.diffNotebookCheckpoint = diffNotebookCheckpoint;
function diffNotebookGit(args) {
    const { path, rendermime, hideUnchanged } = args;
    let name = coreutils_1.PathExt.basename(path, '.ipynb');
    let widget = new widget_1.NbdimeWidget({ base: path, rendermime, hideUnchanged });
    widget.title.label = `Diff git: ${name}`;
    widget.title.caption = `Local: git HEAD\nRemote: '${path}'`;
    widget.title.iconClass = 'fa fa-git jp-fa-tabIcon';
    return widget;
}
exports.diffNotebookGit = diffNotebookGit;
function isNbInGit(args) {
    let request = {
        method: 'POST',
        body: JSON.stringify(args),
    };
    let settings = services_1.ServerConnection.makeSettings();
    return services_1.ServerConnection.makeRequest(coreutils_1.URLExt.join(utils_1.urlRStrip(settings.baseUrl), '/nbdime/api/isgit'), request, settings).then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    }).then((data) => {
        return data['is_git'];
    });
}
exports.isNbInGit = isNbInGit;
//# sourceMappingURL=actions.js.map