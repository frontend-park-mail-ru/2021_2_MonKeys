import EventBus from './eventBus.js';
import { dateLength } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { addPhotoToProfile } from '../requests/profilePhotoRequest.js';
import { loginRequest } from "../requests/sessionRequest.js";
import { feedRequest } from "../requests/feedRequest.js";
import { editProfile } from "../requests/profileRequest.js";
import { tagsRequest } from "../requests/tagsRequest.js";
import { emailRegExp, passwordRegExp } from "../constants/validation.js";
import { EditStore } from "../store/editStore.js";

export const SignupEditEventRegister = () => {
    EventBus.register('signup-edit:save-button', (payload?: string) => {
        // ТОТАЛЬНЕЙШИЙ КРИНЖ ЭТО ДОЛЖНО БЫТЬ ЧЕРЕЗ ВИРТУАЛДОМ ПОТОМ 
        // НО ПОКА ТАК ААААААААААААААА
        // ПОЛНЫЙ КРИНЖ АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
        const _nameInput = document.getElementsByTagName('textarea')[0];
        const _dateInput = document.getElementsByTagName('input')[0];
        const _descriptionInput = document.getElementsByTagName('textarea')[1];
        const _tagsButtons = document.getElementsByClassName('checkbox-btn');
        const _tagsCheckboxes = document.getElementsByClassName('tag-checkbox');
        // const _emailError = document.getElementsByName('error')[0];
        // const _passwordError = document.getElementsByName('error')[1];
        // const _formError = document.getElementsByName('error')[2];

        const testName = _nameInput.value.length !== 0;
        const testDate = _dateInput.value.toString().length === dateLength;

        let storeData = EditStore.get();

        if (!testName) {
          storeData.nameFieldClass = 'form-field-edit-novalid text-without-icon';
          EditStore.set(storeData);
        }

        if (!testDate) {
          storeData.birthDateFieldClass = 'form-field-edit-novalid text-with-icon';
          EditStore.set(storeData);
        }

        if (!testName || !testDate) {
          return;
        }

        storeData.nameFieldClass = 'form-field text-without-icon';
        storeData.birthDateFieldClass = 'form-field text-with-icon';
        EditStore.set(storeData);

        const name = _nameInput.value.trim();
        const date = _dateInput.value.trim();
        const description = _descriptionInput.value.trim();
        let tags = new Array<string>();
        if (ProfileStore.get() !== undefined) {
            const userTags = ProfileStore.get().tags;
            for (const tag of userTags) {
                tags.push(tag);
            }
        }
        editProfile(name, date, description, tags)
            .then(
                (response) => {
                    if (response.status === HTTPSuccess) {
                        if (response.data.status === HTTPSuccess) {
                            router.go('/profile');
                        } else if (response.data.status === HTTPNotFound) {
                            /// ????
                            console.log('xz');
                        }
                    } else {
                        // server internal error
                        console.log('server internal error');
                    }
                }
            ).catch((error) => console.log(error));
    });

    EventBus.register('signup-edit:load', (payload?: string) => {
        tagsRequest()
            .then(
                (response) => {
                    if (response.status === HTTPSuccess) {
                        if (response.data.status === HTTPSuccess) {
                            let storeData = EditStore.get();
                            storeData.tags = response.data.body;
                            Object.keys(storeData.tags.allTags)
                                .map(item=>
                                    storeData.tags.allTags[item].onchange = ()=>
                                    { EventBus.dispatch<string>('signup-edit:change-tag-condition', storeData.tags.allTags[item].tagText); });
                            EditStore.set(storeData);
                            console.log(storeData);
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
                        // if (userTags === undefined) {
                        //     return;
                        // }
                        let storeData = EditStore.get();
                        for (const tag of userTags) {
                            for (let j = 0; j < response.data.body.tagsCount; j++) {
                                if (tag === storeData.tags.allTags[j].tagText) {
                                    storeData.tags.allTags[j].isActive = true;
                                    EditStore.set(storeData);
                                }
                            }
                        }
                        // for (let i = 0; i < userTags.length; i++) {
                        //     for (let j = 0; j < response.data.body.tagsCount; j++) {
                        //         if (userTags[i] === storeData.tags.allTags[j].tagText) {
                        //             storeData.tags.allTags[i + 1].isVisiable = true;
                        //             tagsArr.add(userTags[i]);
                        //         }
                        //     }
                        // }
                        // this._inputTags = tagsArr;
                    }
                }
            ).catch((error) => console.log(error));
    });

    EventBus.register('signup-edit:change-tag-condition', (payload?: string) => {
        let userData = ProfileStore.get();
        let tagsSet = new Set<string>();
        if (userData !== undefined) {
            for (const userTag of userData.tags) {
                tagsSet.add(userTag)
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
            }
            ProfileStore.set(newUserData);
        } else {
            userData.tags = tagsSet;
            // for (const tag of tagsSet) {
            //     userData.tags.add(tag);
            // }
            ProfileStore.set(userData);
        }
    });
    EventBus.register('editProfile:img-input', (event) => {
      const files = event.target.files;
      const formData = new FormData();
      formData.append('myFile', files[0]);

      addPhotoToProfile(formData)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
    });
}
