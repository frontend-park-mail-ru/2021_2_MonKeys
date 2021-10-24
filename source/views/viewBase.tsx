import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";


export default class ViewBase {
    _parent
    _template
    _data
    
    constructor(parent: HTMLElement){
        this._parent = parent;
        // console.log(this);
        // if (window.currentView !== undefined) {
        //     console.log(window.currentView);
        //     console.log(window.currentView !== this);
        //     if (window.currentView.unsubscribe !== undefined) {
        //         console.log(window.currentView.unsubscribe);
        //     }
        // }
        console.log(window.currentView, this);
        
        if (window.currentView && window.currentView !== this && window.currentView.unsubscribe) {
            console.log(this);
            window.currentView.unsubscribe();
        }
        window.currentView = this;
    }

    render() {
        if (window.currentDOM){
            MonkeysVirtualDOM.update(
                this._parent,
                window.currentDOM,
                this._template);
            window.currentDOM = this._template;
        } else {
            console.log(this._template);
            window.currentDOM = this._template;
            this._parent.appendChild(
                MonkeysVirtualDOM.createElement(this._template)
            );
        }
    }
}