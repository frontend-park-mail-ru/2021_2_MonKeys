import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export interface MatchProfile extends ProfileData {
    matchDate: string;
}

export interface MatchData {
    matches: MatchProfile[];
    matchesTotal: number;
}

const MatchStore = new BaseStore<MatchData>();

export { MatchStore };
