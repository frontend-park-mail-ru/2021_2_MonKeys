import router from '../route/router.js';
import EventBus from './eventBus.js';
import { logoutRequest } from '../requests/sessionRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import feedStore from '../store/feedStore.js';
import { EVENTS } from './events.js';
import { EditStore, FieldStatus, Gender } from '../store/editStore.js';
import { ProfileStore } from '../store/profileStore.js';

export const ProfileEventsRegister = () => {
    EventBus.register(EVENTS.PROFILE_EDIT_BUTTON, () => {
        router.go('/edit');
    });

    EventBus.register(EVENTS.PROFILE_LOGOUT_BUTTON, () => {
        AuthStore.set({
            loggedIn: userStatus.notLoggedIn,
        });
        logoutRequest().then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            router.go('/login');

            EditStore.set({
                nameFieldStatus: FieldStatus.Correct,
                birthDateFieldStatus: FieldStatus.Correct,
                genderFieldStatus: FieldStatus.Correct,
                preferFieldStatus: FieldStatus.Correct,
                imgFieldStatus: FieldStatus.Correct,

                gender: Gender.NotSelected,

                tagsField: {
                    open: false,
                    tags: [
                        {
                            tag: 'рок',
                            selected: false,
                        },
                        {
                            tag: 'аниме',
                            selected: false,
                        },
                        {
                            tag: 'комедии',
                            selected: false,
                        },
                        {
                            tag: 'спорт',
                            selected: false,
                        },
                        {
                            tag: 'наука',
                            selected: false,
                        },
                        {
                            tag: 'футбол',
                            selected: false,
                        },
                        {
                            tag: 'рэп',
                            selected: false,
                        },
                        {
                            tag: 'игры',
                            selected: false,
                        },
                    ],
                },

                preferField: {
                    prefers: [
                        {
                            value: 'Мужчину',
                            tag: 'male',
                            selected: false,
                        },
                        {
                            value: 'Женщину',
                            tag: 'female',
                            selected: false,
                        },
                        {
                            value: 'Все равно',
                            tag: '',
                            selected: false,
                        },
                    ],
                },
            });
            feedStore.set({
                profiles: undefined,
                counter: 0,
                outOfCards: false,
                expanded: false,
            });
            ProfileStore.set({
                id: -1,
                name: '',
                gender: '',
                prefer: '',
                age: '',
                date: '',
                description: '',
                imgs: [],
                tags: new Set(),
                reportStatus: '',

                birthDay: '',
                birthMonth: '',
                birthYear: '',
            });
        });
    });
};
