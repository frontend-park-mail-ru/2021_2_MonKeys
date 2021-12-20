import EventBus from './eventBus.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import { addPhotoToProfileRequest, deleteProfilePhotoRequest } from '../requests/profilePhotoRequest.js';
import { EditStore, FieldStatus, Gender } from '../store/editStore.js';
import { validDate, validImgType } from '../validation/edit.js';
import { nameRegExp } from '../constants/validation.js';
import { EVENTS } from './events.js';
import { errorManager } from '../store/errorStore.js';
import { editProfileRequest } from '../requests/profileRequest.js';
import router from '../route/router.js';

export const EditEventRegister = () => {
    EventBus.register(EVENTS.EDIT_NAME_INPUT, () => {
        const _nameInput = document.getElementsByTagName('input')[0];

        const editStore = EditStore.get();

        const test = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        if (!test) {
            editStore.nameFieldStatus = FieldStatus.Hint;
        } else {
            editStore.nameFieldStatus = FieldStatus.Correct;
        }

        EditStore.set(editStore);
    });
    EventBus.register(EVENTS.EDIT_NAME_FOCUSOUT, () => {
        const _nameInput = document.getElementsByTagName('input')[0];

        const editStore = EditStore.get();

        const test = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        if (!test) {
            editStore.nameFieldStatus = FieldStatus.Error;
        } else {
            editStore.nameFieldStatus = FieldStatus.Correct;
        }

        EditStore.set(editStore);
    });

    EventBus.register(EVENTS.EDIT_BIRTH_DATE_INPUT, () => {
        const _dateInput = document.getElementsByTagName('input')[1];

        const editStore = EditStore.get();

        const test = validDate(_dateInput);

        if (!test) {
            editStore.birthDateFieldStatus = FieldStatus.Hint;
        } else {
            editStore.birthDateFieldStatus = FieldStatus.Correct;
        }

        EditStore.set(editStore);
    });
    EventBus.register(EVENTS.EDIT_BIRTH_DATE_FOCUSOUT, () => {
        const _dateInput = document.getElementsByTagName('input')[1];

        const editStore = EditStore.get();

        const test = validDate(_dateInput);

        if (!test) {
            editStore.birthDateFieldStatus = FieldStatus.Error;
        } else {
            editStore.birthDateFieldStatus = FieldStatus.Correct;
        }

        EditStore.set(editStore);
    });

    EventBus.register(EVENTS.EDIT_GENDER_MALE_CLICK, () => {
        const editData = EditStore.get();
        editData.gender = Gender.Male;
        editData.genderFieldStatus = FieldStatus.Correct;
        EditStore.set(editData);
    });
    EventBus.register(EVENTS.EDIT_GENDER_FEMALE_CLICK, () => {
        const editData = EditStore.get();
        editData.gender = Gender.Female;
        editData.genderFieldStatus = FieldStatus.Correct;
        EditStore.set(editData);
    });

    EventBus.register(EVENTS.EDIT_CHANGE_TAG_CONDITION, (payload?: string) => {
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

        userData.tags = tagsSet;
        ProfileStore.set(userData);
    });
    EventBus.register(EVENTS.EDIT_TAGS_CLICK, () => {
        const editStore = EditStore.get();
        editStore.tagsField.open = !editStore.tagsField.open;
        EditStore.set(editStore);
    });
    EventBus.register(EVENTS.EDIT_TAG_CLICK, (tag: string) => {
        const editStore = EditStore.get();

        editStore.tagsField.tags.forEach((element) => {
            if (element.tag === tag) {
                element.selected = !element.selected;
                EditStore.set(editStore);
                return;
            }
        });
    });

    EventBus.register(EVENTS.EDIT_PREFER_CLICK, (payload: string) => {
        const editStore = EditStore.get();

        editStore.preferField.prefers.forEach((prefer) => {
            if (prefer.value === payload) {
                prefer.selected = true;
            } else {
                prefer.selected = false;
            }
        });
        editStore.preferFieldStatus = FieldStatus.Correct;
        EditStore.set(editStore);
    });

    EventBus.register(EVENTS.EDIT_IMG_INPUT, (event) => {
        const files = event.target.files;

        const photo = files[0];

        if (!validImgType(photo)) {
            throw 'photo not uploaded: bad file';
        }

        const profileStore = ProfileStore.get();
        profileStore.imgs.push('icons/loading-buffering.gif');
        ProfileStore.set(profileStore);

        addPhotoToProfileRequest(photo)
            .then((data) => {
                const userData = ProfileStore.get();
                if (data.status !== HTTPSuccess) {
                    throw 'photo not uploaded';
                }

                userData.imgs.pop();
                userData.imgs.push(data.body.photo);
                ProfileStore.set(userData);

                const editStoreData = EditStore.get();
                editStoreData.imgFieldStatus = FieldStatus.Correct;
                EditStore.set(editStoreData);

                const previousPhoto = document.querySelector<HTMLInputElement>('input[id="AddImg"]');
                previousPhoto.value = '';
            })
            .catch((error) => {
                profileStore.imgs.pop();
                ProfileStore.set(profileStore);
                errorManager.pushAPIErrorPhotoLoad();
                throw error;
            });
    });
    EventBus.register(EVENTS.EDIT_IMG_DELETE, (imgPath) => {
        deleteProfilePhotoRequest(imgPath).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            const userData = ProfileStore.get();
            userData.imgs = userData.imgs.filter((image) => {
                if (image != imgPath) {
                    return image;
                }
            });
            ProfileStore.set(userData);
        });
    });

    EventBus.register(EVENTS.EDIT_SAVE_BUTTON, () => {
        const editStore = EditStore.get();
        let validForm = true;
        let goto = '';
        const updateGoto = (anchor) => {
            if (goto === '') goto = anchor;
        };

        // Name
        const _nameInput = document.getElementsByTagName('input')[0];
        const testName = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);
        if (!testName) {
            editStore.nameFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
            validForm = false;
            updateGoto('#name');
        }
        const name = _nameInput.value.trim();
        // ----

        // Date
        const _dateInput = document.getElementsByTagName('input')[1];
        if (!validDate(_dateInput)) {
            editStore.birthDateFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
            validForm = false;
            updateGoto('#date');
        }
        const date = _dateInput.value.trim();
        // ----

        // Gender
        let userGender = '';
        switch (editStore.gender) {
            case Gender.NotSelected:
                editStore.genderFieldStatus = FieldStatus.Error;
                EditStore.set(editStore);
                validForm = false;
                updateGoto('#gender');
                break;
            case Gender.Male:
                userGender = 'male';
                break;
            case Gender.Female:
                userGender = 'female';
                break;
        }
        // ----

        // Description
        const _descriptionInput = document.getElementsByTagName('textarea')[0];
        const description = _descriptionInput.value.trim();
        // ----

        // Tags
        const tags = new Array<string>();
        editStore.tagsField.tags.forEach((tag) => {
            if (tag.selected) {
                tags.push(tag.tag);
            }
        });
        // ----

        // Prefer
        let userPrefer = '';
        let preferValid = false;
        editStore.preferField.prefers.forEach((prefer) => {
            if (prefer.selected) {
                preferValid = true;
                userPrefer = prefer.value;
            }
        });

        if (!preferValid) {
            editStore.preferFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
            validForm = false;
            updateGoto('#prefer');
        }
        // ----

        // Imgs
        const photoPaths = ProfileStore.get().imgs;
        if (photoPaths == undefined || photoPaths.length === 0) {
            editStore.imgFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
            validForm = false;
            updateGoto('#imgs');
        }
        // ----

        if (!validForm) {
            document.querySelector(goto).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            return;
        }

        editProfileRequest(name, userGender, userPrefer, date, description, photoPaths, tags).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            EventBus.dispatch(EVENTS.USER_COOKIE_REQUESTS);
            router.go('/profile');
        });
    });
};
