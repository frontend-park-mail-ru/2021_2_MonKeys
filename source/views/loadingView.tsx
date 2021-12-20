import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Loading } from '../components/loading/loading.js';

export default class LoadingView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.anyone;
        this._template = this._createTmpl(this._data);
        console.log("CHECK");
    }


    _createTmpl(data: any) {
        return (
            <div class="loading-container">
                {Loading()}
            </div>
        )

    }



}
