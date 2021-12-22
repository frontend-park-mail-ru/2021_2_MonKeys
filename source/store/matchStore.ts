import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export interface MatchesProfile extends ProfileData {
    isNew: boolean;
}

export interface MatchData {
    matches: Map<number, MatchesProfile>;
    matchesSearched: MatchesProfile[];
    matchesTotal: number;
    searching: boolean;
}

const MatchesStore = new BaseStore<MatchData>();

MatchesStore.set({
    matches: new Map<number, MatchesProfile>(),
    matchesSearched: [],
    matchesTotal: 0,
    searching: false,
});

export { MatchesStore };
