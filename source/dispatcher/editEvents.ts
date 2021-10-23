import EventBus from './eventBus.js';
import { dateLength } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { loginRequest } from '../requests/sessionRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { editProfile } from '../requests/profileRequest.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { EditStore } from '../store/editStore.js';
import {addPhotoToProfile} from "../requests/profilePhotoRequest.js";


export const EditEventRegister = () => {
  // EventBus.register('signup-edit:save-button', (payload?: string) => {
  //     // ТОТАЛЬНЕЙШИЙ КРИНЖ ЭТО ДОЛЖНО БЫТЬ ЧЕРЕЗ ВИРТУАЛДОМ ПОТОМ
  //     // НО ПОКА ТАК ААААААААААААААА
  //     // ПОЛНЫЙ КРИНЖ АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
  //     const _nameInput = document.getElementsByTagName('textarea')[0];
  //     const _dateInput = document.getElementsByTagName('input')[0];
  //     const _descriptionInput = document.getElementsByTagName('textarea')[1];
  //     const _tagsButtons = document.getElementsByClassName('checkbox-btn');
  //     const _tagsCheckboxes = document.getElementsByClassName('tag-checkbox');
  //     // const _emailError = document.getElementsByName('error')[0];
  //     // const _passwordError = document.getElementsByName('error')[1];
  //     // const _formError = document.getElementsByName('error')[2];

  //     const testName = _nameInput.value.length !== 0;
  //     const testDate = _dateInput.value.toString().length === dateLength;

  //     if (!testName) {
  //       _nameInput.className = 'form-field-edit-novalid text-without-icon';
  //     }

  //     if (!testDate) {
  //       _dateInput.className = 'form-field-edit-novalid text-with-icon';
  //     }

  //     if (!testName || !testDate) {
  //       return;
  //     }

  //     const name = _nameInput.value.trim();
  //     const date = _dateInput.value.trim();
  //     const description = _descriptionInput.value.trim();
  //     const tags = [];
  //     for (const tag of this._inputTags) {
  //       tags.push(tag);
  //     }
  //     editProfile(name, date, description, tags)
  //         .then(
  //             (response) => {
  //                 if (response.status === HTTPSuccess) {
  //                     if (response.data.status === HTTPSuccess) {
  //                         console.log('succes');
  //                     } else if (response.data.status === HTTPNotFound) {
  //                         console.log('xz');
  //                     }
  //                 } else {
  //                     // server internal error
  //                     console.log('server internal error');
  //                 }
  //             }
  //         ).catch((error) => console.log(error));
  // //     window.User.editProfile(name, date, description, tags, () => {
  // //       const profilePage = new ProfileComponent(root);
  // //       profilePage.render();
  // //       const menu = new MenuComponent(root);
  // //       menu.activeItem = 'menu-profile';
  // //       menu.render();
  // //     });
  // //   });
  // });

  // TODO use 'editProfile:'
  EventBus.register('edit:name-input', (payload?: string) => {
    const _emailInput = document.getElementsByTagName('textarea')[0];
    console.log(_emailInput);

    const curClassName = EditStore.get();

    const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
            (test) ?
                curClassName.nameFieldClass = 'form-field text-without-icon' :
                curClassName.nameFieldClass = 'form-field-edit-novalid text-without-icon';

            EditStore.set(curClassName);
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
};
