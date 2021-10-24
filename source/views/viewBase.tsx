import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";


export default class ViewBase {
    _parent
    _template
    _data
    
    constructor(parent: HTMLElement){
        this._parent = parent;
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