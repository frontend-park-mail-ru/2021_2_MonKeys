import EventBus from './eventBus.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import { addPhotoToProfileRequest, deleteProfilePhotoRequest } from '../requests/profilePhotoRequest.js';
import { EditStore, FieldStatus, Gender } from '../store/editStore.js';
import { validDate, validImgType } from '../validation/edit.js';
import { nameRegExp } from '../constants/validation.js';
import { EVENTS } from './events.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';

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
        EditStore.set(editData);
    });
    EventBus.register(EVENTS.EDIT_GENDER_FEMALE_CLICK, () => {
        const editData = EditStore.get();
        editData.gender = Gender.Female;
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
        EditStore.set(editStore);
    });

    EventBus.register(EVENTS.EDIT_IMG_INPUT, (event) => {
        console.log('photo upload');
        const userData = ProfileStore.get();
        if (!userData.imgs) {
            const ps = ProfileStore.get();
            ps.imgs = [];
            ProfileStore.set(ps);
        }
        userData.imgs.push('icons/loading-buffering.gif');
        ProfileStore.set(userData);

        const files = event.target.files;

        const photo = files[0];

        if (!validImgType(photo)) {
            // userData.imgs.pop();
            console.log('не удалось загрузить фотографию');
            console.log(ErrorStore.get());
            // ProfileStore.set(userData);
            throw 'photo not uploaded';
        }

        addPhotoToProfileRequest(photo)
            .then((data) => {
                console.log(data);

                const userData = ProfileStore.get();
                if (data.status !== HTTPSuccess) {
                    // userData.imgs.pop();
                    // ProfileStore.set(userData);
                    throw 'photo not uploaded';
                }

                if (!userData.imgs) {
                    const ps = ProfileStore.get();
                    ps.imgs = [];
                    ProfileStore.set(ps);
                }
                userData.imgs.pop();
                userData.imgs.push(data.body.photo);
                ProfileStore.set(userData);
                const editStoreData = EditStore.get();
                if (editStoreData.imgFieldStatus === FieldStatus.Error) {
                    editStoreData.imgFieldStatus = FieldStatus.Correct;
                }
                EditStore.set(editStoreData);
                const previousPhoto = document.querySelector<HTMLInputElement>('input[id="AddImg"]');
                previousPhoto.value = '';
            })
            .catch((error) => {
                userData.imgs.pop();
                ProfileStore.set(userData);
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

    /*   EventBus.register(EVENTS.EDIT_SAVE_BUTTON, () => {
        const _nameInput = document.getElementsByTagName('input')[0];
        const _dateInput = document.getElementsByTagName('input')[1];
        const _descriptionInput = document.getElementsByTagName('textarea')[0];

        const testName = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        const editStore = EditStore.get();

        if (!testName) {
            editStore.nameFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
        }

        if (!validDate(_dateInput)) {
            editStore.birthDateFieldStatus = FieldStatus.Error;
            EditStore.set(editStore);
        }

        const genderValid = !editStore.genderField.items[0].selected && !editStore.genderField.items[1].selected;
        const preferValid =
            !editStore.preferField.items[0].selected &&
            !editStore.preferField.items[1].selected &&
            !editStore.preferField.items[2].selected;

        if (genderValid) {
            editStore.genderErrorClass = 'error-active';
            EditStore.set(editStore);
        }

        if (preferValid) {
            editStore.preferErrorClass = 'error-active';
            EditStore.set(editStore);
        }

        const photoPaths = ProfileStore.get().imgs;

        if (photoPaths == undefined || photoPaths.length === 0) {
            editStore.imgFieldClass = 'add-img-box-novalid';
            editStore.imgErrorClass = 'error-active';
        }

        if (
            !testName ||
            !validDate(_dateInput) ||
            photoPaths == undefined ||
            photoPaths.length === 0 ||
            genderValid ||
            preferValid
        ) {
            editStore.formErrorClass = 'error-active';
            EditStore.set(editStore);
            return;
        }

        editStore.imgFieldClass = 'add-img-box';
        editStore.imgErrorClass = 'error-inactive';
        editStore.formErrorClass = 'error-inactive';
        editStore.genderErrorClass = 'error-inactive';
        editStore.preferErrorClass = 'error-inactive';
        EditStore.set(editStore);

        const name = _nameInput.value.trim();
        const date = _dateInput.value.trim();
        let userGender = '';
        let userPrefer = '';
        const description = _descriptionInput.value.trim();
        const tags = new Array<string>();
        editStore.tagsField.items.filter((element) => {
            if (element.selected) {
                tags.push(element.value);
            }
        });

        if (editStore.genderField.items[0].selected) {
            userGender = 'male';
        } else {
            userGender = 'female';
        }

        if (editStore.preferField.items[0].selected) {
            userPrefer = 'male';
        } else if (editStore.preferField.items[1].selected) {
            userPrefer = 'female';
        }

        editProfileRequest(name, userGender, userPrefer, date, description, photoPaths, tags).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            EventBus.dispatch<string>(EVENTS.USER_COOKIE_REQUESTS);
            router.go('/profile');
        });
    });*/
};
