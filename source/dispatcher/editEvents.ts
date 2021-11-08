import EventBus from './eventBus.js';
import { dateLength } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { addPhotoToProfile, deleteProfilePhoto } from '../requests/profilePhotoRequest.js';
import { loginRequest } from '../requests/sessionRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { editProfile } from '../requests/profileRequest.js';
import { tagsRequest } from '../requests/tagsRequest.js';
import { EditStore } from '../store/editStore.js';
import {validDate, validImgType} from '../validation/edit.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';

export const EditEventRegister = () => {
    EventBus.register('edit:save-button', (payload?: string) => {
        const _nameInput = document.getElementsByTagName('textarea')[0];
        const _dateInput = document.getElementsByTagName('input')[0];
        const _descriptionInput = document.getElementsByTagName('textarea')[1];

        const testName = _nameInput.value.length !== 0;

        const storeData = EditStore.get();
        storeData.apiErrorLoadCondition = false;
        EditStore.set(storeData);

        if (!testName) {
            storeData.nameFieldClass = 'form-field-edit-novalid text-without-icon';
            EditStore.set(storeData);
        }

        if (!validDate(_dateInput)) {
            storeData.birthDateFieldClass = 'form-field-edit-novalid text-with-icon';
            EditStore.set(storeData);
        }

        if (!testName || !validDate(_dateInput)) {
            storeData.formErrorClass = 'login-error-active';
            EditStore.set(storeData);
            return;
        }

        storeData.nameFieldClass = 'form-field-edit text-without-icon';
        storeData.birthDateFieldClass = 'form-field-edit text-with-icon';
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

        if (photoPaths == undefined || photoPaths.length === 0) {
            storeData.addImgFieldClass = 'form-field-edit-novalid';
            storeData.formErrorClass = 'login-error-active';
            EditStore.set(storeData);
            return;
        }

        editProfile(name, date, description, photoPaths, tags)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        EventBus.dispatch<string>('user:cookie-requests');
                        router.go('/profile');
                    } else if (response.data.status === HTTPNotFound) {
                        throw 'HTTPNotFound';
                    }
                } else {
                    storeData.apiErrorLoadCondition = true;
                    EditStore.set(storeData);
                }
            })
            .catch(() => {
                storeData.apiErrorLoadCondition = true;
                EditStore.set(storeData);
            });
    });

    EventBus.register('edit:open-tags', (payload?: string) => {
        const storeData = EditStore.get();
        storeData.apiErrorLoadCondition = false;
        EditStore.set(storeData);
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
                        throw 'HTTPNotFound';
                    }
                } else {
                    const storeData = EditStore.get();
                    storeData.apiErrorLoadCondition = true;
                    EditStore.set(storeData);
                }

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
            .catch(() => {
                const storeData = EditStore.get();
                storeData.apiErrorLoadCondition = true;
                EditStore.set(storeData);
            });
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
        storeData.apiErrorLoadCondition = false;
        EditStore.set(storeData);

        const test = _nameInput.value.length !== 0;

        test
            ? (storeData.nameFieldClass = 'form-field-edit text-without-icon')
            : (storeData.nameFieldClass = 'form-field-edit-novalid text-without-icon');

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        EditStore.set(storeData);
    });

    EventBus.register('edit:birth-date-input', (payload?: string) => {
        const _dateInput = document.getElementsByTagName('input')[0];

        const storeData = EditStore.get();
        storeData.apiErrorLoadCondition = false;
        EditStore.set(storeData);

        const test = _dateInput.value.toString().length === dateLength;
        test
            ? (storeData.birthDateFieldClass = 'form-field-edit text-with-icon')
            : (storeData.birthDateFieldClass = 'form-field-edit-novalid text-with-icon');

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        EditStore.set(storeData);
    });
    EventBus.register('edit:img-input', (event) => {
        const files = event.target.files;

        const photo = files[0];

        if (!validImgType(photo)) {
            return;
        }

        addPhotoToProfile(photo)
            .then((response) => {
                if (response.status !== HTTPSuccess) {
                    throw 'photo not uploaded';
                }

                const userData = ProfileStore.get();
                if (!userData.imgs) {
                    const ps = ProfileStore.get();
                    ps.imgs = [];
                    ProfileStore.set(ps);
                }
                userData.imgs.push(response.data.body.photo);
                ProfileStore.set(userData);
            })
            .catch(() => {
                const storeData = EditStore.get();
                storeData.apiErrorLoadCondition = true;
                EditStore.set(storeData);
            });
    });
    EventBus.register('edit:img-delete', (imgPath) => {
        deleteProfilePhoto(imgPath)
            .then((response) => {
                if (response.status !== HTTPSuccess) {
                    const storeData = EditStore.get();
                    storeData.apiErrorLoadCondition = true;
                    EditStore.set(storeData);
                }
                const userData = ProfileStore.get();
                userData.imgs = userData.imgs.filter((image) => {
                    if (image != imgPath) {
                        return image;
                    }
                });
                ProfileStore.set(userData);
            })
            .catch((error) => {
                const storeData = EditStore.get();
                storeData.apiErrorLoadCondition = true;
                EditStore.set(storeData);
            });
    });
};
