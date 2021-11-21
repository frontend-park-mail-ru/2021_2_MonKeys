import BaseStore from './storeBase.js';
import { Chat } from '../components/chat/chat.js';
import { chatURL } from '../constants/urls.js';

export interface Message {
    messageID: number;
    fromID: number;
    toID: number;
    text: string;
    date: Date;
    isRead: boolean;
}

export interface Chat {
    fromUserID: number;
    name: string;
    img: string;
    messages: Message[];
}

export interface ChatsData {
    chats: Chat[];
    currentChat: number;
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
            fromUserID: 2,
            name: 'masha',
            img: 'path.img',
            messages: [
                {
                    messageID: 13,
                    fromID: 1,
                    toID: 2,
                    text: 'hi',
                    date: new Date(),
                    isRead: true,
                },
                {
                    messageID: 14,
                    fromID: 2,
                    toID: 2,
                    text: 'hi!',
                    date: new Date(),
                    isRead: true,
                },
            ],
        },
        {
            fromUserID: 3,
            name: 'alina',
            img: 'path.img',
            messages: [
                {
                    messageID: 15,
                    fromID: 1,
                    toID: 3,
                    text: 'hi',
                    date: new Date(),
                    isRead: true,
                },
                {
                    messageID: 16,
                    fromID: 2,
                    toID: 3,
                    text: 'privet',
                    date: new Date(),
                    isRead: true,
                },
            ],
        },
    ],
    currentChat: null,
};

ChatsStore.set(initData);

export const getIdxByChatID = (chatID: number) => {
    const chats = ChatsStore.get().chats;

    for (let i = 0; i < chats.length; i++) {
        if (chats[i].fromUserID === chatID) {
            return i;
        }
    }

    return undefined;
};

export const getChatByID = (chatID: number) => {
    const chats = ChatsStore.get().chats;

    for (const chat of chats) {
        if (chat.fromUserID === chatID) {
            return chat;
        }
    }

    return null;
};

export const getFirstMessageID = (chatID: number) => {
    const chat = getChatByID(chatID);
    return chat.messages[0].messageID;
};

export const getCurrentChat = () => {
    const chat = ChatsStore.get().currentChat;
    return getChatByID(chat);
};

export const updateChatMessages = (chatID: number, messages: Message[]) => {
    if (messages === null) {
        return;
    }

    const chatsStore = ChatsStore.get();

    const chatIdx = getIdxByChatID(chatID);

    for (const msg of chatsStore.chats[chatIdx].messages) {
        messages.push(msg);
    }
    chatsStore.chats[chatIdx].messages = messages;

    ChatsStore.set(chatsStore);
};

export { ChatsStore };
