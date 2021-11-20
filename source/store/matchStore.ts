import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type MatchProfile = ProfileData;

// export interface MatchProfile extends ProfileData {
//     matchDate: string;
// }

export interface MatchData {
    matches: MatchProfile[];
    matchesSearched: MatchProfile[];
    matchesTotal: number;
    searching: boolean;
}

const MatchesStore = new BaseStore<MatchData>();

MatchesStore.set({
    matches: [],
    matchesSearched: [],
    matchesTotal: 0,
    searching: false,
});

export { MatchesStore };
