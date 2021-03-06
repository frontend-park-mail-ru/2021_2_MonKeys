import BaseStore from './storeBase.js';
import { ProfileData, ProfileStore } from './profileStore.js';
import { MatchesStore } from './matchStore.js';

interface Message {
    messageID: number;
    fromID: number;
    toID: number;
    text: string;
    date: Date;
    isRead: boolean;
}

interface Chat {
    fromUserID: number;
    name: string;
    img: string;
    messages: Message[];
    draftMessage: string;
    opened: boolean;
    profile: ProfileData;
    isOpenedProfile: boolean;
}

interface ChatsData {
    chats: Chat[];
    currentChat: number;
}

const ChatsStore = new BaseStore<ChatsData>();

ChatsStore.set({
    chats: [],
    currentChat: null,
});

function compareChats(l: Chat, r: Chat) {
    const lastMsg = (messages: Message[]) => messages[messages.length - 1];
    if (l.messages.length === 0 || r.messages.length === 0 || lastMsg(l.messages).date < lastMsg(r.messages).date) {
        return 1;
    }

    return -1;
}

class ChatsManager {
    // all chats
    get chatsWithMessages() {
        const chats = [];
        ChatsStore.get().chats.forEach((chat: Chat) => {
            if (chat.messages.length != 0) {
                chats.push(chat);
            }
        });

        chats.sort(compareChats);

        return chats;
    }
    set chats(chats: Chat[]) {
        if (chats === null) {
            chats = [];
        }

        const chatsStore = ChatsStore.get();
        chatsStore.chats = chats;
        ChatsStore.set(chatsStore);
    }

    // chat
    newChat(profile: ProfileData) {
        if (profile === null) {
            return;
        }

        const newChatID = profile.id;

        if (this.hasChat(newChatID)) {
            return;
        }

        const matchesData = MatchesStore.get();
        let fromProfile: ProfileData;
        for (let i = 0; i < matchesData.matchesTotal; i++) {
            if (matchesData.matches[i].id === profile.id) {
                profile = matchesData.matches[i];
            }
        }

        const chat: Chat = {
            fromUserID: newChatID,
            name: profile.name,
            img: profile.imgs[0],
            messages: [],
            draftMessage: '',
            opened: true,
            profile: fromProfile,
            isOpenedProfile: false,
        };

        const chatsStore = ChatsStore.get();
        chatsStore.chats.push(chat);
        chatsStore.currentChat = newChatID;
        ChatsStore.set(chatsStore);
    }

    switchChat(chatID: number) {
        const chatsStore = ChatsStore.get();
        chatsStore.currentChat = chatID;
        ChatsStore.set(chatsStore);
    }

    hasChat(chatID: number) {
        return this.getChatByID(chatID) != null;
    }

    hasMessages(chatID: number) {
        const chat = this.getChatByID(chatID);
        return chat.messages.length !== 0;
    }

    // current chat
    get chatID() {
        return ChatsStore.get().currentChat;
    }
    get chat() {
        return this.getChatByID(this.chatID);
    }

    updateChatMessages(chatID: number, messages: Message[]) {
        if (messages === null) {
            return;
        }

        const chatsStore = ChatsStore.get();

        const chatIdx = this.getChatIdxByChatID(chatID);

        for (const msg of chatsStore.chats[chatIdx].messages) {
            messages.push(msg);
        }
        chatsStore.chats[chatIdx].messages = messages;

        ChatsStore.set(chatsStore);
    }

    saveNewMessage(message: Message) {
        if (message === null || !this.hasChat(this.getChatIDByMessage(message))) {
            return;
        }

        const storeData = ChatsStore.get();
        const chatIdx = this.getChatIdxByMessage(message);

        storeData.chats[chatIdx].messages.push(message);

        ChatsStore.set(storeData);
    }

    getFirstMessageID(chatID: number) {
        const chat = this.getChatByID(chatID);
        return chat.messages[0].messageID;
    }

    getChatIDByMessage(message: Message) {
        if (message === null) {
            return null;
        }

        const profileID = ProfileStore.get().id;
        return profileID === message.fromID ? message.toID : message.fromID;
    }

    saveDraftMessage(chatID: number, msg: string) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].draftMessage = msg;
        ChatsStore.set(chatsData);
    }

    clearDraftMessage(chatID: number) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].draftMessage = '';
        ChatsStore.set(chatsData);
    }

    openChat(chatID: number) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].opened = true;
        ChatsStore.set(chatsData);
    }

    closeChat(chatID: number) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].opened = false;
        ChatsStore.set(chatsData);
    }

    withProfile(chatID: number) {
        const curChat = this.getChatByID(chatID);
        if (curChat.profile) {
            return true;
        }
        return false;
    }

    setProfile(chatID: number, fromProfile: ProfileData) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].profile = fromProfile;
        ChatsStore.set(chatsData);
    }

    activateProfile(chatID: number) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].isOpenedProfile = true;
        ChatsStore.set(chatsData);
    }

    disableProfile(chatID: number) {
        const chatIdx = this.getChatIdxByChatID(chatID);
        const chatsData = ChatsStore.get();
        chatsData.chats[chatIdx].isOpenedProfile = false;
        ChatsStore.set(chatsData);
    }

    private getChatByID(chatID: number) {
        const chats = ChatsStore.get().chats;

        for (const chat of chats) {
            if (chat.fromUserID === chatID) {
                return chat;
            }
        }

        return null;
    }
    private getChatIdxByChatID(chatID: number) {
        const chats = ChatsStore.get().chats;

        for (let i = 0; i < chats.length; i++) {
            if (chats[i].fromUserID === chatID) {
                return i;
            }
        }

        return null;
    }
    private getChatIdxByMessage(message: Message) {
        if (message === null) {
            return null;
        }
        return this.getChatIdxByChatID(this.getChatIDByMessage(message));
    }
}

const chatsManager = new ChatsManager();

export { ChatsStore, Message, Chat, chatsManager };
