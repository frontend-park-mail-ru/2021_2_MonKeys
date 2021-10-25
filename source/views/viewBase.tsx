import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";


export default class ViewBase {
    _parent
    _template
    _data
    
    constructor(parent: HTMLElement){
        this._parent = parent;        
        if (window.currentView && window.currentView !== this && window.currentView.unsubscribe) {
            window.currentView.unsubscribe();
        }
        window.currentView = this;
    }

    render() {
        if (window.currentDOM){
            // console.log('------------------------')
            // console.log(this._template);
            MonkeysVirtualDOM.update(
                this._parent,
                window.currentDOM,
                this._template);
            window.currentDOM = this._template;
        } else {
            // console.log(this._template);
            window.currentDOM = this._template;
            this._parent.appendChild(
                MonkeysVirtualDOM.createElement(this._template)
            );
        }
    }
}