import BaseStore from './storeBase.js';

export interface TapbarData {
    activeItem: string;
}

const TapbarStore = new BaseStore<TapbarData>();

export default TapbarStore;
