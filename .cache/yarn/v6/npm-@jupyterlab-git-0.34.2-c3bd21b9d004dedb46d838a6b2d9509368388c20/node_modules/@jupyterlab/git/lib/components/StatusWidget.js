import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { gitIcon } from '../style/icons';
import { statusAnimatedIconClass, statusIconClass } from '../style/StatusWidget';
import { sleep } from '../utils';
export class StatusWidget extends ReactWidget {
    /**
     * Returns a status bar widget.
     * @param trans - The language translator
     * @returns widget
     */
    constructor(trans) {
        super();
        /**
         * Boolean indicating whether the status widget is accepting updates.
         */
        this._locked = false;
        /**
         * Status string.
         */
        this._status = '';
        this._trans = trans;
    }
    /**
     * Sets the current status.
     */
    set status(text) {
        this._status = text;
        if (!this._locked) {
            this._animate();
        }
    }
    render() {
        return (React.createElement("div", { title: `Git: ${this._trans.__(this._status)}` },
            React.createElement(gitIcon.react, { className: this._status !== 'idle' ? statusAnimatedIconClass : statusIconClass, left: '1px', top: '3px', stylesheet: 'statusBar' })));
    }
    /**
     * Locks the status widget to prevent updates.
     *
     * ## Notes
     *
     * -   This is used to throttle updates in order to prevent "flashing" messages.
     */
    async _animate() {
        this._locked = true;
        this.update();
        await sleep(500);
        this._locked = false;
        this.update();
    }
}
export function addStatusBarWidget(statusBar, model, settings, trans) {
    // Add a status bar widget to provide Git status updates:
    const statusWidget = new StatusWidget(trans);
    statusBar.registerStatusItem('git-status', {
        align: 'left',
        item: statusWidget,
        isActive: Private.isStatusWidgetActive(settings),
        activeStateChanged: settings && settings.changed
    });
    const callback = Private.createEventCallback(statusWidget);
    model.taskChanged.connect(callback);
    statusWidget.disposed.connect(() => {
        model.taskChanged.disconnect(callback);
    });
}
/* eslint-disable no-inner-declarations */
var Private;
(function (Private) {
    /**
     * Returns a callback for updating a status widget upon receiving model events.
     *
     * @private
     * @param widget - status widget
     * @returns callback
     */
    function createEventCallback(widget) {
        return onEvent;
        /**
         * Callback invoked upon a model event.
         *
         * @private
         * @param model - extension model
         * @param event - event name
         */
        function onEvent(model, event) {
            let status;
            switch (event) {
                case 'empty':
                    status = 'idle';
                    break;
                case 'git:checkout':
                    status = 'checking out…';
                    break;
                case 'git:clone':
                    status = 'cloning repository…';
                    break;
                case 'git:commit:create':
                    status = 'committing changes…';
                    break;
                case 'git:commit:revert':
                    status = 'reverting changes…';
                    break;
                case 'git:init':
                    status = 'initializing repository…';
                    break;
                case 'git:merge':
                    status = 'merging…';
                    break;
                case 'git:pull':
                    status = 'pulling changes…';
                    break;
                case 'git:pushing':
                    status = 'pushing changes…';
                    break;
                case 'git:refresh':
                    status = 'refreshing…';
                    break;
                case 'git:reset:changes':
                    status = 'resetting changes…';
                    break;
                case 'git:reset:hard':
                    status = 'discarding changes…';
                    break;
                default:
                    if (/git:add:files/.test(event)) {
                        status = 'adding files…';
                    }
                    else {
                        status = 'working…';
                    }
                    break;
            }
            widget.status = status;
        }
    }
    Private.createEventCallback = createEventCallback;
    /**
     * Returns a callback which returns a boolean indicating whether the extension should display status updates.
     *
     * @private
     * @param settings - extension settings
     * @returns callback
     */
    function isStatusWidgetActive(settings) {
        return settings ? isActive : inactive;
        /**
         * Returns a boolean indicating that the extension should not display status updates.
         *
         * @private
         * @returns boolean indicating that the extension should not display status updates
         */
        function inactive() {
            return false;
        }
        /**
         * Returns a boolean indicating whether the extension should display status updates.
         *
         * @private
         * @returns boolean indicating whether the extension should display status updates
         */
        function isActive() {
            return settings.composite.displayStatus;
        }
    }
    Private.isStatusWidgetActive = isStatusWidgetActive;
})(Private || (Private = {}));
/* eslint-enable no-inner-declarations */
//# sourceMappingURL=StatusWidget.js.map