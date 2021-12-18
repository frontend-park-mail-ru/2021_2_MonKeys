import { MatchesStore } from 'store/matchStore.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { MatchProfile } from './matchProfile.js';

export const Matches = (matches) => {
    return (
        <div class='chats__matches'>
            <div class='chats__matches-header'>Ваши пары</div>
            <div class='chats__matches-profiles'>
                {Object.keys(matches).map((item) => MatchProfile({ userData: matches[item] }))}
            </div>
        </div>
    );
};
