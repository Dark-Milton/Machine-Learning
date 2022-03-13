import { IJupyterWidgetRegistry } from "@jupyter-widgets/base";
import { MODULE_NAME, MODULE_VERSION } from "./version";
/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app, registry) {
    registry.registerWidget({
        name: MODULE_NAME,
        version: MODULE_VERSION,
        exports: () => import("./index"),
    });
}
/**
 * The widget plugin.
 */
const widgetPlugin = {
    id: "jupyterlab-plotly",
    requires: [IJupyterWidgetRegistry],
    activate: activateWidgetExtension,
    autoStart: true,
};
export default widgetPlugin;
