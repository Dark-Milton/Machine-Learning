"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const widgets_1 = require("@lumino/widgets");
const plotly_1 = __importDefault(require("plotly.js/dist/plotly"));
require("../style/index.css");
/**
 * The CSS class to add to the Plotly Widget.
 */
const CSS_CLASS = "jp-RenderedPlotly";
/**
 * The CSS class for a Plotly icon.
 */
const CSS_ICON_CLASS = "jp-MaterialIcon jp-PlotlyIcon";
/**
 * The MIME type for Plotly.
 * The version of this follows the major version of Plotly.
 */
exports.MIME_TYPE = "application/vnd.plotly.v1+json";
class RenderedPlotly extends widgets_1.Widget {
    /**
     * Create a new widget for rendering Plotly.
     */
    constructor(options) {
        super();
        this.addClass(CSS_CLASS);
        this._mimeType = options.mimeType;
        // Create image element
        this._img_el = document.createElement("img");
        this._img_el.className = "plot-img";
        this.node.appendChild(this._img_el);
        // Install image hover callback
        this._img_el.addEventListener("mouseenter", (event) => {
            this.createGraph(this._model);
        });
    }
    /**
     * Render Plotly into this widget's node.
     */
    renderModel(model) {
        if (this.hasGraphElement()) {
            // We already have a graph, don't overwrite it
            return Promise.resolve();
        }
        // Save off reference to model so that we can regenerate the plot later
        this._model = model;
        // Check for PNG data in mime bundle
        const png_data = model.data["image/png"];
        if (png_data !== undefined && png_data !== null) {
            // We have PNG data, use it
            this.updateImage(png_data);
            return Promise.resolve();
        }
        else {
            // Create a new graph
            return this.createGraph(model);
        }
    }
    hasGraphElement() {
        // Check for the presence of the .plot-container element that plotly.js
        // places at the top of the figure structure
        return this.node.querySelector(".plot-container") !== null;
    }
    updateImage(png_data) {
        this.hideGraph();
        this._img_el.src = "data:image/png;base64," + png_data;
        this.showImage();
    }
    hideGraph() {
        // Hide the graph if there is one
        let el = this.node.querySelector(".plot-container");
        if (el !== null && el !== undefined) {
            el.style.display = "none";
        }
    }
    showGraph() {
        // Show the graph if there is one
        let el = this.node.querySelector(".plot-container");
        if (el !== null && el !== undefined) {
            el.style.display = "block";
        }
    }
    hideImage() {
        // Hide the image element
        let el = this.node.querySelector(".plot-img");
        if (el !== null && el !== undefined) {
            el.style.display = "none";
        }
    }
    showImage() {
        // Show the image element
        let el = this.node.querySelector(".plot-img");
        if (el !== null && el !== undefined) {
            el.style.display = "block";
        }
    }
    createGraph(model) {
        const { data, layout, frames, config } = model.data[this._mimeType];
        return plotly_1.default.react(this.node, data, layout, config).then((plot) => {
            this.showGraph();
            this.hideImage();
            this.update();
            if (frames) {
                plotly_1.default.addFrames(this.node, frames);
            }
            if (this.node.offsetWidth > 0 && this.node.offsetHeight > 0) {
                plotly_1.default.toImage(plot, {
                    format: "png",
                    width: this.node.offsetWidth,
                    height: this.node.offsetHeight,
                }).then((url) => {
                    const imageData = url.split(",")[1];
                    if (model.data["image/png"] !== imageData) {
                        model.setData({
                            data: Object.assign(Object.assign({}, model.data), { "image/png": imageData }),
                        });
                    }
                });
            }
            // Handle webgl context lost events
            this.node.on("plotly_webglcontextlost", () => {
                const png_data = model.data["image/png"];
                if (png_data !== undefined && png_data !== null) {
                    // We have PNG data, use it
                    this.updateImage(png_data);
                    return Promise.resolve();
                }
            });
        });
    }
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    onAfterShow(msg) {
        this.update();
    }
    /**
     * A message handler invoked on a `'resize'` message.
     */
    onResize(msg) {
        this.update();
    }
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        if (this.isVisible && this.hasGraphElement()) {
            plotly_1.default.redraw(this.node).then(() => {
                plotly_1.default.Plots.resize(this.node);
            });
        }
    }
}
exports.RenderedPlotly = RenderedPlotly;
/**
 * A mime renderer factory for Plotly data.
 */
exports.rendererFactory = {
    safe: true,
    mimeTypes: [exports.MIME_TYPE],
    createRenderer: (options) => new RenderedPlotly(options),
};
const extensions = [
    {
        id: "@jupyterlab/plotly-extension:factory",
        rendererFactory: exports.rendererFactory,
        rank: 0,
        dataType: "json",
        fileTypes: [
            {
                name: "plotly",
                mimeTypes: [exports.MIME_TYPE],
                extensions: [".plotly", ".plotly.json"],
                iconClass: CSS_ICON_CLASS,
            },
        ],
        documentWidgetFactoryOptions: {
            name: "Plotly",
            primaryFileType: "plotly",
            fileTypes: ["plotly", "json"],
            defaultFor: ["plotly"],
        },
    },
];
exports.default = extensions;
