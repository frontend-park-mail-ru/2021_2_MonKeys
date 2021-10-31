import EventBus from './eventBus.js';
import { dateLength } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { addPhotoToProfile } from '../requests/profilePhotoRequest.js';
import { loginRequest } from '../requests/sessionRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { editProfile } from '../requests/profileRequest.js';
import { tagsRequest } from '../requests/tagsRequest.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { EditStore } from '../store/editStore.js';
import { validImgType } from '../validation/edit.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';

export const EditEventRegister = () => {
    EventBus.register('edit:save-button', (payload?: string) => {
        const _nameInput = document.getElementsByTagName('textarea')[0];
        const _dateInput = document.getElementsByTagName('input')[0];
        const _descriptionInput = document.getElementsByTagName('textarea')[1];

        const testName = _nameInput.value.length !== 0;
        const testDate = _dateInput.value.toString().length === dateLength;

        const storeData = EditStore.get();

        if (!testName) {
            storeData.nameFieldClass = 'form-field-edit-novalid text-without-icon';
            EditStore.set(storeData);
        }

        if (!testDate) {
            storeData.birthDateFieldClass = 'form-field-edit-novalid text-with-icon';
            EditStore.set(storeData);
        }

        if (!testName || !testDate) {
            storeData.formErrorClass = 'login-error-active';
            EditStore.set(storeData);
            return;
        }

        storeData.nameFieldClass = 'form-field text-without-icon';
        storeData.birthDateFieldClass = 'form-field text-with-icon';
        storeData.formErrorClass = 'login-error';
        EditStore.set(storeData);

        const name = _nameInput.value.trim();
        const date = _dateInput.value.trim();
        const description = _descriptionInput.value.trim();
        const tags = new Array<string>();
        if (ProfileStore.get() !== undefined && ProfileStore.get().tags !== undefined) {
            const userTags = ProfileStore.get().tags;
            for (const tag of userTags) {
                tags.push(tag);
            }
        }
        const photoPaths = ProfileStore.get().imgs;
        console.log(photoPaths);
        editProfile(name, date, description, photoPaths, tags)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        EventBus.dispatch<string>('user:cookie-requests');
                    } else if (response.data.status === HTTPNotFound) {
                        /// ????
                        console.log('xz');
                    }
                } else {
                    // server internal error
                    console.log('server internal error');
                }
            })
            .catch((error) => console.log(error));
    });

    EventBus.register('edit:open-tags', (payload?: string) => {
        tagsRequest()
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        const storeData = EditStore.get();
                        storeData.tags = response.data.body;
                        Object.keys(storeData.tags.allTags).map(
                            (item) =>
                                (storeData.tags.allTags[item].onchange = () => {
                                    EventBus.dispatch<string>(
                                        'edit:change-tag-condition',
                                        storeData.tags.allTags[item].tagText
                                    );
                                })
                        );
                        EditStore.set(storeData);
                    } else if (response.data.status === HTTPNotFound) {
                        console.log('xz');
                    }
                } else {
                    // server internal error
                    console.log('server internal error');
                }

                // выставляем теги, которые уже есть у пользователя
                if (ProfileStore.get() !== undefined) {
                    const userTags = ProfileStore.get().tags;
                    if (userTags === undefined) {
                        return;
                    }
                    const storeData = EditStore.get();
                    for (const tag of userTags) {
                        for (let j = 0; j < response.data.body.tagsCount; j++) {
                            if (tag === storeData.tags.allTags[j].tagText) {
                                storeData.tags.allTags[j].isActive = true;
                                EditStore.set(storeData);
                            }
                        }
                    }
                }
            })
            .catch((error) => console.log(error));
    });

    EventBus.register('edit:change-tag-condition', (payload?: string) => {
        const userData = ProfileStore.get();
        const tagsSet = new Set<string>();
        if (userData && userData.tags) {
            for (const userTag of userData.tags) {
                tagsSet.add(userTag);
            }
        }

        if (tagsSet.has(payload)) {
            tagsSet.delete(payload);
        } else {
            tagsSet.add(payload);
        }

        if (userData === undefined) {
            const newUserData = {
                tags: tagsSet,
            };
            ProfileStore.set(newUserData);
        } else {
            userData.tags = tagsSet;
            ProfileStore.set(userData);
        }
    });

    EventBus.register('edit:name-input', (payload?: string) => {
        const _nameInput = document.getElementsByTagName('textarea')[0];

        const storeData = EditStore.get();

        const test = _nameInput.value.length !== 0;

        test
            ? (storeData.nameFieldClass = 'form-field text-without-icon')
            : (storeData.nameFieldClass = 'form-field-edit-novalid text-without-icon');

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        EditStore.set(storeData);
    });

    EventBus.register('edit:birth-date-input', (payload?: string) => {
        const _dateInput = document.getElementsByTagName('input')[0];

        const storeData = EditStore.get();

        const test = _dateInput.value.toString().length === dateLength;
        test
            ? (storeData.birthDateFieldClass = 'form-field text-with-icon')
            : (storeData.birthDateFieldClass = 'form-field-edit-novalid text-with-icon');

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        EditStore.set(storeData);
    });
    EventBus.register('edit:img-input', (event) => {
        const files = event.target.files;

        if (files.length !== 0) {
            const photo = files[0];

            if (validImgType(photo)) {
                addPhotoToProfile(photo)
                    .then((response) => {
                        if (response.status !== HTTPSuccess) {
                            throw 'jopa';
                        }

                        // изменения стора должно повлечь изменение вьюхи
                        const userData = ProfileStore.get();
                        if (!userData.imgs) {
                            const ps = ProfileStore.get();
                            ps.imgs = [];
                        }
                        userData.imgs.push(response.data.body.photo);
                        console.log(userData.imgs);
                        ProfileStore.set(userData);
                        const photoPaths = ProfileStore.get().imgs;
                        console.log(photoPaths);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    });
};
