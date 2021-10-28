import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { EditForm } from '../components/editForm.js';
import EventBus from '../dispatcher/eventBus.js';
import { EditStore } from '../store/editStore.js';
import { errorEditFormMsg } from '../constants/errorMsg.js';

export default class SignupEditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe(this.subscribtionCallback, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'editForm': {
            'fields': {
                'name': {
                    tag: 'textarea',
                    placeholder: 'Имя',
                    name: 'userName',
                    class: EditStore.get().nameFieldClass,
                    oninput: () => {
                        EventBus.dispatch<string>('edit:name-input');
                    },
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    class: EditStore.get().birthDateFieldClass,
                    name: 'birthDate',
                    oninput: () => {
                        EventBus.dispatch<string>('edit:birth-date-input');
                    },
                },
                'description': {
                    tag: 'textarea',
                    placeholder: 'Расскажите о себе',
                    name: 'description',
                    class: 'form-field-desc text-desc',
                },
            },
            'tags': EditStore.get().tags,
            'buttons': {
                'tagsButton': {
                    type: 'button',
                    text: 'tags',
                    clas: '',
                    onclick: () => {
                        EventBus.dispatch<string>('edit:open-tags');
                    },
                },
                'imgAddButton': {
                    type: 'button',
                    text: '',
                    class: 'add',
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
                'formError': {
                    text: errorEditFormMsg,
                    class: EditStore.get().formErrorClass,
                },
            },
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _createTmpl(data) {
        return <div>{EditForm(this._data.editForm)}</div>;
    }

    public unsubscribe() {
        EditStore.unsubscribe(this.subscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        view._data.editForm.fields.name.class = data.nameFieldClass;
        view._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
        view._data.editForm.errorMsgs.formError.class = data.formErrorClass;
        view._data.editForm.tags = data.tags;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
