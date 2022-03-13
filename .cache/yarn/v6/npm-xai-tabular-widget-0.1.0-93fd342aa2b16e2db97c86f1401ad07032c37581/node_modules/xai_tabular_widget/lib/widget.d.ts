import '../css/widget.css';
import { DOMWidgetModel, DOMWidgetView, ISerializers } from '@jupyter-widgets/base';
/** Widget model for storing information and syncing with the Python backend */
export declare class TabularWidgetModel extends DOMWidgetModel {
    defaults(): any;
    static serializers: ISerializers;
    static model_name: string;
    static model_module: any;
    static model_module_version: any;
    static view_name: string;
    static view_module: any;
    static view_module_version: any;
}
/** Widget view for embedding the Angular app. */
export declare class TabularWidgetView extends DOMWidgetView {
    iframe: HTMLIFrameElement;
    render(): void;
    dataUrlChanged(): void;
    dataJsonChanged(): void;
    dataDictChanged(): void;
}
