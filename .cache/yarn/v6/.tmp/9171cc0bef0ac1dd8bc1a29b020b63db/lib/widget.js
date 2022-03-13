"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the CSS
require("../css/widget.css");
const base_1 = require("@jupyter-widgets/base");
const version_1 = require("./version");
// This file is not running under Google3/Blaze environment
// tslint:disable-next-line:no-require-imports
const mainJS = require('file-loader!./main.js');
const runtimeJS = require('file-loader!./runtime.js');
const polyfillsJS = require('file-loader!./polyfills.js');
const polyfillsES5JS = require('file-loader!./polyfills-es5.js');
const vendorJS = require('file-loader!./vendor.js');
// BEGIN OSS
const STYLES_HTML = '<link href="https://unpkg.com/@angular/material@9.0.0-rc.6/prebuilt-themes/purple-green.css" rel="stylesheet">';
// END OSS
/* BEGIN PANTHEON
// [Pantheon tooltip]
// END PANTHEON */
// This is a standard of Jupyter Lab widget for syncing with python codes
// tslint:disable:enforce-name-casing
/** Widget model for storing information and syncing with the Python backend */
class TabularWidgetModel extends base_1.DOMWidgetModel {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { _model_name: TabularWidgetModel.model_name, _model_module: TabularWidgetModel.model_module, _model_module_version: TabularWidgetModel.model_module_version, _view_name: TabularWidgetModel.view_name, _view_module: TabularWidgetModel.view_module, _view_module_version: TabularWidgetModel.view_module_version, description: 'A widget to visualize tabular attributions.', _data_url: '', _data_str: '', _data_dict: {}, ready: false });
    }
}
exports.TabularWidgetModel = TabularWidgetModel;
TabularWidgetModel.serializers = Object.assign({}, base_1.DOMWidgetModel.serializers);
TabularWidgetModel.model_name = 'TabularWidgetModel';
TabularWidgetModel.model_module = version_1.MODULE_NAME;
TabularWidgetModel.model_module_version = version_1.MODULE_VERSION;
TabularWidgetModel.view_name = 'TabularWidgetView'; // Set to null if no view
TabularWidgetModel.view_module = version_1.MODULE_NAME; // Set to null if no view
TabularWidgetModel.view_module_version = version_1.MODULE_VERSION;
// tslint:enable:enforce-name-casing
/** Widget view for embedding the Angular app. */
class TabularWidgetView extends base_1.DOMWidgetView {
    render() {
        const iframe = document.createElement('iframe');
        const app = `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>XAI TabularWidget</title>
          <base href="/">

          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
          ${STYLES_HTML}
          <style type="text/css">
            html, body { height: 100%; }
            body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
          </style>
        </head>
        <body>
          <app-root></app-root>
          <script src="${mainJS}" type="module" defer></script>
<script src="${runtimeJS}" type="module" defer></script>
<script src="${polyfillsJS}" type="module" defer></script>
<script src="${polyfillsES5JS}" type="module" defer></script>
<script src="${vendorJS}" type="module" defer></script>

        </body>
    </html>

    `;
        iframe.id = 'xai-widget-iframe';
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.srcdoc = app;
        this.iframe = iframe;
        this.el.appendChild(this.iframe);
        const model = this.model;
        model.on('change:_data_url', this.dataUrlChanged, this);
        model.on('change:_data_str', this.dataJsonChanged, this);
        model.on('change:_data_dict', this.dataDictChanged, this);
        window.document.addEventListener('readyEvent', handleReadyEvent);
        function handleReadyEvent(e) {
            model.set('ready', true);
            model.save_changes();
        }
        window.document.addEventListener('iframeResizeEvent', handleIframeResizeEvent);
        function handleIframeResizeEvent(e) {
            if (isCustomEvent(e)) {
                iframe.style.height = `${e.detail}px`;
            }
        }
    }
    dataUrlChanged() {
        const ifrmEle = this.el.querySelector('#xai-widget-iframe');
        const ifrm = ifrmEle.contentDocument;
        if (ifrm !== null) {
            const e = new CustomEvent('loadDataFromUrlEvent', {
                detail: {
                    url: this.model.get('_data_url'),
                }
            });
            ifrm.dispatchEvent(e);
        }
    }
    dataJsonChanged() {
        const ifrmEle = this.el.querySelector('#xai-widget-iframe');
        const ifrm = ifrmEle.contentDocument;
        if (ifrm !== null) {
            const e = new CustomEvent('loadDataFromJsonEvent', {
                detail: {
                    data: this.model.get('_data_str'),
                }
            });
            ifrm.dispatchEvent(e);
        }
    }
    dataDictChanged() {
        const ifrmEle = this.el.querySelector('#xai-widget-iframe');
        const ifrm = ifrmEle.contentDocument;
        if (ifrm !== null) {
            const e = new CustomEvent('loadDataFromDictEvent', {
                detail: {
                    data: this.model.get('_data_dict'),
                }
            });
            ifrm.dispatchEvent(e);
        }
    }
}
exports.TabularWidgetView = TabularWidgetView;
function isCustomEvent(event) {
    return 'detail' in event;
}
//# sourceMappingURL=widget.js.map