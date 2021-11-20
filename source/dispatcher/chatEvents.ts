import EventBus from './eventBus.js';
import { MatchesStore } from '../store/matchStore.js';
import { searchMathesRequest } from '../requests/matchRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:search', () => {
        // const storeData = MatchesStore.get();
        // storeData.searching = true;
        // MatchesStore.set(storeData);

        // console.log(storeData.matches);
        const _searchInput = document.getElementsByTagName('input')[0];
        const searchTmpl = _searchInput.value.trim() + '%';

        searchMathesRequest(searchTmpl).then((matchesResponse) => {
            if (matchesResponse.status === HTTPSuccess) {
                if (matchesResponse.data.status === HTTPSuccess) {
                    if (matchesResponse.data.body.allUsers) {
                        const matchesData = MatchesStore.get();
                        matchesData.matches = matchesResponse.data.body.allUsers;
                        matchesData.matchesTotal = matchesResponse.data.body.matchesCount;
                        MatchesStore.set(matchesData);
                    }
                } else {
                    throw '400';
                }
            } else {
                // const feedData = feedStore.get();
                // feedData.apiErrorLoadCondition = true;
                // feedStore.set(feedData);
            }
        });

        // const storeData = MatchesStore.get();
        // storeData.expended = false;
        // <tStore.set(storeData);
    });
};
