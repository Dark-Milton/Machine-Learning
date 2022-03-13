"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCSFileBrowserPlugin = exports.FILE_BROWSER_PLUGIN_ID = void 0;
const docmanager_1 = require("@jupyterlab/docmanager");
const filebrowser_1 = require("@jupyterlab/filebrowser");
const widgets_1 = require("@lumino/widgets");
require("../../style/gcsfilebrowser/index.css");
const plugin_1 = require("../service/plugin");
const service_provider_1 = require("../service/service_provider");
const utils_1 = require("../utils");
const commands_1 = require("./commands");
const contents_1 = require("./contents");
const panel_header_1 = require("./panel_header");
const application_1 = require("@jupyterlab/application");
const NAMESPACE = 'gcsfilebrowser';
class GCSBrowserWidget extends widgets_1.Widget {
    constructor(header, browser) {
        super();
        this.addClass('jp-GCSBrowser');
        this.layout = new widgets_1.PanelLayout();
        const panelLayout = this.layout;
        panelLayout.addWidget(header);
        panelLayout.addWidget(browser);
    }
}
function activateGCSFileBrowser(app, manager, factory, restorer) {
    return __awaiter(this, void 0, void 0, function* () {
        const drive = new contents_1.GCSDrive(service_provider_1.ServiceProvider.gcsHandlerService);
        manager.services.contents.addDrive(drive);
        const browser = factory.createFileBrowser(NAMESPACE, {
            driveName: drive.name,
        });
        const header = new panel_header_1.PanelHeader(drive.activitySignal);
        const gcsBrowser = new GCSBrowserWidget(header, browser);
        gcsBrowser.addClass('jp-GCSFilebrowser');
        gcsBrowser.addClass('jp-FileBrowser');
        gcsBrowser.title.iconClass = 'jp-GCSFilebrowserIcon jp-SideBar-tabIcon';
        gcsBrowser.title.caption = 'Browse GCS';
        gcsBrowser.id = 'jp-Beatrix-GCS-GCSBrowserWidget';
        restorer.add(gcsBrowser, NAMESPACE);
        app.shell.add(gcsBrowser, 'left', { rank: 100 });
        commands_1.addCommands(app, factory);
    });
}
/** File browser plugin id */
exports.FILE_BROWSER_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:gcs_file_browser_plugin`;
/**
 * The JupyterLab plugin for the GCS Filebrowser.
 */
exports.GCSFileBrowserPlugin = {
    id: exports.FILE_BROWSER_PLUGIN_ID,
    requires: [
        docmanager_1.IDocumentManager,
        filebrowser_1.IFileBrowserFactory,
        application_1.ILayoutRestorer,
        plugin_1.IServiceProvider,
    ],
    activate: activateGCSFileBrowser,
    autoStart: true,
};
