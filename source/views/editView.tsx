import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { EditForm } from '../components/editForm.js';
import { EditStore } from '../store/editStore.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import {
    errorNameMsg,
    errorAgeMsg,
    errorImgMsg,
    errorEditFormMsg,
    errorGenderMsg,
    errorPreferMsg,
} from '../constants/errorMsg.js';
import { Errors } from '../components/error/errors.js';

export default class EditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe(this.subcribtionCallbackEdit, this);
        ProfileStore.subscribe(this.subcribtionCallbackProfile, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);

        const storeData = ProfileStore.get();
        const editStore = EditStore.get();
        switch (storeData.gender) {
            case 'male':
                editStore.genderField.items[0].selected = true;
                editStore.genderField.items[1].selected = false;
                break;
            case 'female':
                editStore.genderField.items[1].selected = true;
                editStore.genderField.items[0].selected = false;
                break;
        }
        switch (storeData.prefer) {
            case 'male':
                editStore.preferField.items[0].selected = true;
                editStore.preferField.items[1].selected = false;
                editStore.preferField.items[2].selected = false;
                break;
            case 'female':
                editStore.preferField.items[0].selected = false;
                editStore.preferField.items[1].selected = true;
                editStore.preferField.items[2].selected = false;
                break;
            default:
                editStore.preferField.items[0].selected = false;
                editStore.preferField.items[1].selected = false;
                editStore.preferField.items[2].selected = true;
                break;
        }

        EditStore.set(editStore);

        this._template = this._createTmpl(this._data);
    }

    _data = {
        'editForm': {
            'fields': {
                'genderField': EditStore.get().genderField,
                'tagsField': EditStore.get().tagsField,
                'preferField': EditStore.get().preferField,
                'name': {
                    tag: 'textarea',
                    placeholder: 'Имя',
                    value: ProfileStore.get().name,
                    name: 'userName',
                    class: EditStore.get().nameFieldClass,
                    oninput: () => {
                        EventBus.dispatch<string>('edit:name-input');
                    },
                    onfocusout: () => {
                        EventBus.dispatch<string>('edit:name-focusout');
                    },
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    value: ProfileStore.get().date,
                    class: EditStore.get().birthDateFieldClass,
                    name: 'birthDate',
                    oninput: () => {
                        EventBus.dispatch<string>('edit:birth-date-input');
                    },
                    onfocusout: () => {
                        EventBus.dispatch<string>('edit:birth-date-focusout');
                    },
                },
                'description': {
                    tag: 'textarea',
                    placeholder: 'Расскажите о себе',
                    value: ProfileStore.get().description,
                    name: 'description',
                    class: 'form__field-valid',
                },
                'img': {
                    class: EditStore.get().imgFieldClass,
                },
            },
            'buttons': {
                'tagsButton': {
                    type: 'button',
                    text: 'tags',
                    class: 'tags-button',
                    src: 'icons/expand_big.svg',
                    onclick: () => {
                        EventBus.dispatch<string>('edit:open-tags');
                    },
                },
                'imgAddButton': {
                    class: EditStore.get().imgFieldClass,
                    onchange: (event) => {
                        EventBus.dispatch<string>('edit:img-input', event);
                    },
                    imgs: ProfileStore.get().imgs,
                },
                'saveButton': {
                    type: 'button',
                    text: 'Сохранить',
                    class: 'button-white-big',
                    onclick: () => {
                        EventBus.dispatch<string>('edit:save-button');
                    },
                },
            },
            'errorMsgs': {
                'nameError': {
                    text: errorNameMsg,
                    class: EditStore.get().nameErrorClass,
                },
                'ageError': {
                    text: errorAgeMsg,
                    class: EditStore.get().birthDateErrorClass,
                },
                'genderError': {
                    text: errorGenderMsg,
                    class: EditStore.get().genderErrorClass,
                },
                'preferError': {
                    text: errorPreferMsg,
                    class: EditStore.get().preferErrorClass,
                },
                'imgError': {
                    text: errorImgMsg,
                    class: EditStore.get().imgErrorClass,
                },
                'formError': {
                    text: errorEditFormMsg,
                    class: EditStore.get().formErrorClass,
                },
            },
        },
        'tapbar': {
            class: 'menu-icon',
        },
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class='view-contant view-content__scroll-y'>
                {EditForm(data.editForm)}
                {Errors(data.error)}
            </div>
        );
    }

    public unsubscribe() {
        EditStore.unsubscribe(this.subcribtionCallbackEdit);
        ProfileStore.unsubscribe(this.subcribtionCallbackProfile);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subcribtionCallbackEdit(data, view) {
        view._data.editForm.fields.name.class = data.nameFieldClass;
        view._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
        view._data.editForm.fields.img.class = data.imgFieldClass;
        view._data.editForm.errorMsgs.nameError.class = data.nameErrorClass;
        view._data.editForm.errorMsgs.ageError.class = data.birthDateErrorClass;
        view._data.editForm.errorMsgs.imgError.class = data.imgErrorClass;
        view._data.editForm.errorMsgs.formError.class = data.formErrorClass;
        view._data.editForm.tags = data.tags;
        view._data.editForm.fields.name.value = ProfileStore.get().name;
        view._data.editForm.fields.birthDate.value = ProfileStore.get().date;
        view._data.editForm.fields.description.value = ProfileStore.get().description;

        view._data.editForm.fields.genderField = data.genderField;
        view._data.editForm.fields.preferField = data.preferField;
        view._data.editForm.fields.tagsField = data.tagsField;
        view._data.editForm.errorMsgs.genderError.class = data.genderErrorClass;
        view._data.editForm.errorMsgs.preferError.class = data.preferErrorClass;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private subcribtionCallbackProfile(data, view) {
        view._data.editForm.buttons.imgAddButton.imgs = ProfileStore.get().imgs;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
