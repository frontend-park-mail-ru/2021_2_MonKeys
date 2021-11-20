import BaseStore from './storeBase.js';
import { Chat } from '../components/chat/chat.js';

export interface Message {
    messageID: string;
    fromID: string;
    text: string;
    date: Date;
    isRead: boolean;
}

export interface Chat {
    fromID: string;
    name: string;
    img: string;
    messages: Message[];
}

export interface ChatsData {
    chats: Chat[];
}

const ChatsStore = new BaseStore<ChatsData>();

/*
let chats = new Map<string, Chat>();
chats.set('2', {
    name: 'masha',
    img: 'path.img',
    messages: [
        {
            messageID: '1asd12',
            fromID: '1',
            text: 'hi',
            date: new Date(),
            isRead: true,
        },
        {
            messageID: '1asda12wef',
            fromID: '2',
            text: 'hi!',
            date: new Date(),
            isRead: true,
        },
    ],
});
chats.set('3', {
    name: 'alina',
    img: 'path.img',
    messages: [
        {
            messageID: '1asd12',
            fromID: '1',
            text: 'hi',
            date: new Date(),
            isRead: true,
        },
        {
            messageID: '1asda12wef',
            fromID: '2',
            text: 'privet',
            date: new Date(),
            isRead: true,
        },
    ],
});
*/

const initData = {
    chats: [
        {
            fromID: '2',
            name: 'masha',
            img: 'path.img',
            messages: [
                {
                    messageID: '1asd12',
                    fromID: '1',
                    text: 'hi',
                    date: new Date(),
                    isRead: true,
                },
                {
                    messageID: '1asda12wef',
                    fromID: '2',
                    text: 'hi!',
                    date: new Date(),
                    isRead: true,
                },
            ],
        },
        {
            fromID: '3',
            name: 'alina',
            img: 'path.img',
            messages: [
                {
                    messageID: '1asd12',
                    fromID: '1',
                    text: 'hi',
                    date: new Date(),
                    isRead: true,
                },
                {
                    messageID: '1asda12wef',
                    fromID: '2',
                    text: 'privet',
                    date: new Date(),
                    isRead: true,
                },
            ],
        },
    ],
};

ChatsStore.set(initData);

export const getChatByID = (id: string) => {
    const chats = ChatsStore.get().chats;

    for (const chat of chats) {
        if (chat.fromID === id) {
            return chat;
        }
    }

    return null;
}

export { ChatsStore };
