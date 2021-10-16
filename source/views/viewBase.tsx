import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";


export default class ViewBase {
    _parent
    _template
    _data
    
    constructor(parent: HTMLElement){
        this._parent = parent;
    }

    render() {
        this._parent.appendChild(
            MonkeysVirtualDOM.createElement(this._template)
        );
    }
}