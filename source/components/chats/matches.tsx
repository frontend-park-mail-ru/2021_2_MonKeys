import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { MatchProfile } from './matchProfile.js';

export const Matches = (matches) => {
  return (
    <div class='view-content__matches'>
      <div class='view-content__matches-header'>Ваши пары</div>
      <div class='view-content__matches-profiles'>
        {Object.keys(matches).map((item) => MatchProfile({ userData: matches[item] }))}
      </div>
    </div>
  );
};
