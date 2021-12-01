import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { EditForm } from '../components/edit/editForm.js';
import EventBus from '../dispatcher/eventBus.js';
import { EditStore } from '../store/editStore.js';
import { ProfileStore } from '../store/profileStore.js';
import {
    errorNameMsg,
    errorAgeMsg,
    errorImgMsg,
    errorEditFormMsg,
    errorGenderMsg,
    errorPreferMsg,
} from '../constants/errorMsg.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Errors } from '../components/error/errors.js';
import { Button } from '../components/common/button.js';

export default class SignupEditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe(this.subscribtionCallback, this);
        ProfileStore.subscribe(this.subcribtionCallbackProfile, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
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
                    class: EditStore.get().birthDateFieldClass,
                    name: 'birthDate',
                    iconSrc: 'icons/calendar.svg',
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
                    class: '',
                    src: 'icons/expand_big.svg',
                    onclick: () => {
                        EventBus.dispatch<string>('edit:open-tags');
                    },
                },
                'imgAddButton': {
                    class: 'add',
                    onchange: (event) => {
                        EventBus.dispatch<string>('edit:img-input', event);
                    },
                },
                'saveButton': {
                    type: 'button',
                    text: 'Сохранить',
                    class: 'button-default edit__save-button',
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
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class='app__content--align-center'>
                <div class='edit'>
                    <div class='edit__header'>
                        <span class='header-text'>Настройки</span>
                    </div>
                    {EditForm(data.editForm)}
                    <div class='edit__manager'>{Button(data.editForm.buttons.saveButton)}</div>
                    {Errors(data.error)}
                </div>
            </div>
        );
    }

    public unsubscribe() {
        EditStore.unsubscribe(this.subscribtionCallback);
        ProfileStore.unsubscribe(this.subcribtionCallbackProfile);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subscribtionCallback(data, view) {
        view._data.editForm.fields.name.class = data.nameFieldClass;
        view._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
        view._data.editForm.fields.img.class = data.imgFieldClass;
        view._data.editForm.errorMsgs.nameError.class = data.nameErrorClass;
        view._data.editForm.errorMsgs.ageError.class = data.birthDateErrorClass;
        view._data.editForm.errorMsgs.imgError.class = data.imgErrorClass;
        view._data.editForm.errorMsgs.formError.class = data.formErrorClass;
        view._data.editForm.tags = data.tags;

        view._data.editForm.fields.genderField = data.genderField;
        view._data.editForm.fields.preferField = data.preferField;
        view._data.editForm.fields.tagsField = data.tagsField;
        view._data.editForm.errorMsgs.genderError.class = data.genderErrorClass;
        view._data.editForm.errorMsgs.preferError.class = data.preferErrorClass;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private subcribtionCallbackProfile(data, view) {
        view._data.editForm.buttons.imgAddButton.imgs = ProfileStore.get().imgs;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
