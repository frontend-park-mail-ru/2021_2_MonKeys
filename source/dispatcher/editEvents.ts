import EventBus from './eventBus.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { addPhotoToProfileRequest, deleteProfilePhotoRequest } from '../requests/profilePhotoRequest.js';
import { editProfileRequest } from '../requests/profileRequest.js';
import { tagsRequest } from '../requests/tagsRequest.js';
import { EditStore } from '../store/editStore.js';
import { validDate, validImgType } from '../validation/edit.js';
import { nameRegExp } from '../constants/validation.js';
import { EVENTS } from './events.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';

export const EditEventRegister = () => {
    EventBus.register(EVENTS.EDIT_SAVE_BUTTON, () => {
        const _nameInput = document.getElementsByTagName('input')[0];
        const _dateInput = document.getElementsByTagName('input')[1];
        const _descriptionInput = document.getElementsByTagName('textarea')[0];

        const testName = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        const storeData = EditStore.get();

        if (!testName) {
            storeData.nameFieldClass = 'form__field-invalid';
            storeData.nameErrorClass = 'error-active';
            EditStore.set(storeData);
        }

        if (!validDate(_dateInput)) {
            storeData.birthDateFieldClass = 'form__field-invalid';
            storeData.birthDateErrorClass = 'error-active';
            EditStore.set(storeData);
        }

        const genderValid = !storeData.genderField.items[0].selected && !storeData.genderField.items[1].selected;
        const preferValid =
            !storeData.preferField.items[0].selected &&
            !storeData.preferField.items[1].selected &&
            !storeData.preferField.items[2].selected;

        if (genderValid) {
            storeData.genderErrorClass = 'error-active';
            EditStore.set(storeData);
        }

        if (preferValid) {
            storeData.preferErrorClass = 'error-active';
            EditStore.set(storeData);
        }

        const photoPaths = ProfileStore.get().imgs;

        if (photoPaths == undefined || photoPaths.length === 0) {
            storeData.imgFieldClass = 'add-img-box-novalid';
            storeData.imgErrorClass = 'error-active';
        }

        if (
            !testName ||
            !validDate(_dateInput) ||
            photoPaths == undefined ||
            photoPaths.length === 0 ||
            genderValid ||
            preferValid
        ) {
            storeData.formErrorClass = 'error-active';
            EditStore.set(storeData);
            return;
        }

        storeData.nameFieldClass = 'form__field-valid';
        storeData.nameErrorClass = 'error-inactive';
        storeData.birthDateFieldClass = 'form__field-valid';
        storeData.birthDateErrorClass = 'error-inactive';
        storeData.imgFieldClass = 'add-img-box';
        storeData.imgErrorClass = 'error-inactive';
        storeData.formErrorClass = 'error-inactive';
        storeData.genderErrorClass = 'error-inactive';
        storeData.preferErrorClass = 'error-inactive';
        EditStore.set(storeData);

        const name = _nameInput.value.trim();
        const date = _dateInput.value.trim();
        let userGender = '';
        let userPrefer = '';
        const description = _descriptionInput.value.trim();
        const tags = new Array<string>();
        storeData.tagsField.items.filter((element) => {
            if (element.selected) {
                tags.push(element.value);
            }
        });

        if (storeData.genderField.items[0].selected) {
            userGender = 'male';
        } else {
            userGender = 'female';
        }

        if (storeData.preferField.items[0].selected) {
            userPrefer = 'male';
        } else if (storeData.preferField.items[1].selected) {
            userPrefer = 'female';
        }

        editProfileRequest(name, userGender, userPrefer, date, description, photoPaths, tags).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            EventBus.dispatch<string>(EVENTS.USER_COOKIE_REQUESTS);
            router.go('/profile');
        });
    });

    EventBus.register(EVENTS.EDIT_OPEN_TAGS, () => {
        tagsRequest().then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }

            const storeData = EditStore.get();
            storeData.tags = data.body;
            Object.keys(storeData.tags.allTags).map(
                (item) =>
                    (storeData.tags.allTags[item].onchange = () => {
                        EventBus.dispatch<string>(
                            EVENTS.EDIT_CHANGE_TAG_CONDITION,
                            storeData.tags.allTags[item].tagText
                        );
                    })
            );
            EditStore.set(storeData);

            if (ProfileStore.get() !== undefined) {
                const userTags = ProfileStore.get().tags;
                if (userTags === undefined) {
                    return;
                }
                const storeData = EditStore.get();
                for (const tag of userTags) {
                    for (let j = 0; j < data.body.tagsCount; j++) {
                        if (tag === storeData.tags.allTags[j].tagText) {
                            storeData.tags.allTags[j].isActive = true;
                            EditStore.set(storeData);
                        }
                    }
                }
            }
        });
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

    EventBus.register(EVENTS.EDIT_NAME_INPUT, () => {
        const _nameInput = document.getElementsByTagName('input')[0];

        const storeData = EditStore.get();

        const test = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        test ? (storeData.nameFieldClass = 'form__field-valid') : (storeData.nameFieldClass = 'form__field-invalid');
        if (!test && storeData.nameErrorClass !== 'error-active') {
            storeData.nameErrorClass = 'error-hint';
        }
        if (test && (storeData.nameErrorClass === 'error-active' || storeData.nameErrorClass === 'error-hint')) {
            storeData.nameErrorClass = 'error-inactive';
        }

        if (storeData.nameErrorClass === 'error-active' || storeData.nameErrorClass === 'error-hint') {
            storeData.formErrorClass = 'error-inactive';
        }

        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_NAME_FOCUSOUT, () => {
        const _nameInput = document.getElementsByTagName('input')[0];

        const storeData = EditStore.get();

        const test = _nameInput.value.length !== 0 && nameRegExp.test(_nameInput.value);

        if (test) {
            storeData.nameFieldClass = 'form__field-valid';
            storeData.nameErrorClass = 'error-inactive';
        } else {
            storeData.nameFieldClass = 'form__field-invalid';
            storeData.nameErrorClass = 'error-active';
        }

        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_BIRTH_DATE_INPUT, () => {
        const _dateInput = document.getElementsByTagName('input')[1];

        const storeData = EditStore.get();

        const test = validDate(_dateInput);

        test
            ? (storeData.birthDateFieldClass = 'form__field-valid')
            : (storeData.birthDateFieldClass = 'form__field-invalid text-with-icon');

        if (test && storeData.birthDateErrorClass === 'error-active') {
            storeData.birthDateErrorClass = 'error-inactive';
        }

        if (storeData.formErrorClass === 'error-active') {
            storeData.formErrorClass = 'error-inactive';
        }

        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_BIRTH_DATE_FOCUSOUT, () => {
        const _dateInput = document.getElementsByTagName('input')[1];

        const storeData = EditStore.get();

        const test = validDate(_dateInput);

        if (test) {
            storeData.birthDateFieldClass = 'form__field-valid';
            storeData.birthDateErrorClass = 'error-inactive';
        } else {
            storeData.birthDateFieldClass = 'form__field-invalid text-with-icon';
            storeData.birthDateErrorClass = 'error-active';
        }

        EditStore.set(storeData);
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
                editStoreData.imgFieldClass = 'add-img-box';
                if (editStoreData.imgErrorClass === 'error-active') {
                    editStoreData.imgErrorClass = 'error-inactive';
                }
                editStoreData.formErrorClass = 'error-inactive';
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

    EventBus.register(EVENTS.EDIT_TAGS_CLICK, () => {
        const storeData = EditStore.get();
        if (ProfileStore.get().tags) {
            const tags = [];
            ProfileStore.get().tags.forEach((v) => tags.push(v));
            storeData.tagsField.items.filter((element) => {
                if (tags.indexOf(element.value) !== -1) {
                    element.selected = true;
                }
            });
        }
        storeData.tagsField.open = !storeData.tagsField.open;
        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_TAG_CLICK, (payload?: string) => {
        const storeData = EditStore.get();

        storeData.tagsField.items.filter((element) => {
            if (element.value === payload) {
                element.selected = !element.selected;
                EditStore.set(storeData);
                return;
            }
        });
    });

    EventBus.register(EVENTS.EDIT_GENDER_MALE_CLICK, () => {
        const storeData = EditStore.get();
        storeData.genderField.items[0].selected = true;
        storeData.genderField.items[1].selected = false;
        storeData.genderErrorClass = 'error-inactive';
        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_GENDER_FEMALE_CLICK, () => {
        const storeData = EditStore.get();
        storeData.genderField.items[0].selected = false;
        storeData.genderField.items[1].selected = true;
        storeData.genderErrorClass = 'error-inactive';
        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_PREFER_MALE_CLICK, () => {
        const storeData = EditStore.get();
        storeData.preferField.items[0].selected = true;
        storeData.preferField.items[1].selected = false;
        storeData.preferField.items[2].selected = false;
        storeData.preferErrorClass = 'error-inactive';
        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_PREFER_FEMALE_CLICK, () => {
        const storeData = EditStore.get();
        storeData.preferField.items[0].selected = false;
        storeData.preferField.items[1].selected = true;
        storeData.preferField.items[2].selected = false;
        storeData.preferErrorClass = 'error-inactive';
        EditStore.set(storeData);
    });

    EventBus.register(EVENTS.EDIT_PREFER_ANY_CLICK, () => {
        const storeData = EditStore.get();
        storeData.preferField.items[0].selected = false;
        storeData.preferField.items[1].selected = false;
        storeData.preferField.items[2].selected = true;
        storeData.preferErrorClass = 'error-inactive';
        EditStore.set(storeData);
    });
};
