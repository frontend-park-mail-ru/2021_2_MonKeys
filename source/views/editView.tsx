import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { EditForm } from '../components/editForm.js';
import { EditStore } from '../store/editStore.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import { CritError } from '../components/critError.js';
import { ErrorStore } from '../store/errorStore.js';
import { errorNameMsg, errorAgeMsg, errorImgMsg, errorEditFormMsg } from '../constants/errorMsg.js';

export default class EditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe(this.subcribtionCallbackEdit, this);
        ProfileStore.subscribe(this.subcribtionCallbackProfile, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'editForm': {
            'fields': {
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
                    class: 'form-field-edit text-desc',
                },
                'img': {
                    class: EditStore.get().imgFieldClass,
                },
            },
            'tags': EditStore.get().tags,
            'buttons': {
                'tagsButton': {
                    type: 'button',
                    text: 'tags',
                    class: 'tags-button',
                    src: '../icons/button_expand_white.svg',
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
                    class: 'edit',
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
        'critError': {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class='card-container'>
                {EditForm(data.editForm)}
                {Tapbar(data.tapbar)}
                {CritError(data.critError)}
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
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._data.editForm.fields.name.value = ProfileStore.get().name;
        view._data.editForm.fields.birthDate.value = ProfileStore.get().date;
        view._data.editForm.fields.description.value = ProfileStore.get().description;
        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private subcribtionCallbackProfile(data, view) {
        view._data.editForm.buttons.imgAddButton.imgs = ProfileStore.get().imgs;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
