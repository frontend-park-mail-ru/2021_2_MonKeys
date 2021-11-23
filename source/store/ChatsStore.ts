import BaseStore from './storeBase.js';
import { Chat } from '../components/chat/chat.js';
import { ProfileStore } from './profileStore.js';

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

const initData = {
    chats: [],
    currentChat: null,
};

ChatsStore.set(initData);

export const getChatIdxByChatID = (chatID: number) => {
    const chats = ChatsStore.get().chats;

    for (let i = 0; i < chats.length; i++) {
        if (chats[i].fromUserID === chatID) {
            return i;
        }
    }

    return undefined;
};

export const getChatIdxByMessage = (message: Message) => {
    if (message === null) {
        return;
    }

    const profileID = ProfileStore.get().id;
    const chatID = profileID === message.fromID ? message.toID : message.fromID;

    return getChatIdxByChatID(chatID);
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

    const chatIdx = getChatIdxByChatID(chatID);

    for (const msg of chatsStore.chats[chatIdx].messages) {
        messages.push(msg);
    }
    chatsStore.chats[chatIdx].messages = messages;

    ChatsStore.set(chatsStore);
};

export { ChatsStore };
