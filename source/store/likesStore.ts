import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type MatchCardData = ProfileData;

export interface LikesData {
    profiles: MatchCardData[];
    mathesCount: number;
}

const LikesStore = new BaseStore<LikesData>();

LikesStore.set({
    profiles: [
        // {
        // id: '1',
        // name: 'Ilyagy',
        // age: '10',
        // date: '01.01.2000',
        // description: 'mda kone4no',
        // imgSrc: new Set(['img/drake-peeking.gif']),
        // tags: new Set(['Rap', 'Dota 2']),
        // },
        // {
        //     id: "2",
        //     name: "Ilyagy22",
        //     age: "12",
        //     date: "01.01.2000",
        //     description: "mda kone4no",
        //     imgSrc: new Set(["img/stare-dont-blink.gif"]),
        //     tags: new Set(['Yeezy', 'Wyoming'])
        // },
    ],
    mathesCount: 0,
});

export default LikesStore;
