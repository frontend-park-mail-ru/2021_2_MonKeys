import BaseStore from './storeBase.js';

export interface Message {
    text: string;
    fromID: string;
}

export interface ChatData {
    chatName: string;

    messages: Message[];

    apiErrorLoadCondition: boolean;
}

const ChatStore = new BaseStore<ChatData>();

const initData = {
    chatName: 'no name',
    messages: [
        {
            text: 'hi',
            fromID: '1',
        },
        {
            text: 'hi!',
            fromID: '2',
        },
    ],
    apiErrorLoadCondition: false,
};

ChatStore.set(initData);

export { ChatStore };
