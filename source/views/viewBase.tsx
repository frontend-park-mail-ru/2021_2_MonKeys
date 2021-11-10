import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export default class ViewBase {
    _parent;
    _template;
    _data;

    constructor(parent: HTMLElement) {
        this._parent = parent;
        if (window.currentView && window.currentView !== this && window.currentView.unsubscribe) {
            window.currentView.unsubscribe();
        }
        window.currentView = this;
    }

    render() {
        if (window.currentDOM) {
            MonkeysVirtualDOM.update(this._parent, window.currentDOM, this._template);

            window.currentDOM = this._template;
        } else {
            window.currentDOM = this._template;

            this._parent.appendChild(MonkeysVirtualDOM.createElement(this._template));
        }
    }
    forceRender() {
        // signature, will be redifened later
    }
    unsubscribe() {
        // signature, will be redifened later
    }
}
