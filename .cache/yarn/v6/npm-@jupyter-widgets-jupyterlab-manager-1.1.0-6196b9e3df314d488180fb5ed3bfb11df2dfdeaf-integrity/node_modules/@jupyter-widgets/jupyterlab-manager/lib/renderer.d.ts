import { IDisposable } from '@phosphor/disposable';
import { Panel } from '@phosphor/widgets';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { WidgetManager } from './manager';
/**
 * A renderer for widgets.
 */
export declare class WidgetRenderer extends Panel implements IRenderMime.IRenderer, IDisposable {
    constructor(options: IRenderMime.IRendererOptions, manager?: WidgetManager);
    /**
     * The widget manager.
     */
    manager: WidgetManager;
    renderModel(model: IRenderMime.IMimeModel): Promise<void>;
    /**
     * Get whether the manager is disposed.
     *
     * #### Notes
     * This is a read-only property.
     */
    readonly isDisposed: boolean;
    /**
     * Dispose the resources held by the manager.
     */
    dispose(): void;
    private _rerender;
    /**
     * The mimetype being rendered.
     */
    readonly mimeType: string;
    private _manager;
    private _rerenderMimeModel;
}
