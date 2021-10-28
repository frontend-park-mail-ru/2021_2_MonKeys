import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tapbar } from "../components/tapbar.js";
import { EditForm } from "../components/editForm.js";
import { EditStore } from "../store/editStore.js";
import { ProfileStore } from "../store/profileStore.js";
import EventBus from "../dispatcher/eventBus.js"
import { errorEditFormMsg } from "../constants/errorMsg.js";


export default class EditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe(this.subcribtionCallback, this);
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
                    oninput: () => { EventBus.dispatch<string>('edit:name-input'); },
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    value: ProfileStore.get().date,
                    class: EditStore.get().birthDateFieldClass,
                    name: 'birthDate',
                    oninput: () => { EventBus.dispatch<string>('edit:birth-date-input'); },
                },
                'description': {
                    tag: 'textarea',
                    placeholder: 'Расскажите о себе',
                    value: ProfileStore.get().description,
                    name: 'description',
                    class: 'form-field-desc text-desc',
                }
            },
            'tags': EditStore.get().tags,
            'buttons': {
                'tagsButton': {
                    type: 'button',
                    text: 'tags',
                    clas: '',
                    onclick: ()=>{ EventBus.dispatch<string>('edit:open-tags'); },
                },
                'imgAddButton': {
                    class: 'add',
                    onchange: (event)=>{ EventBus.dispatch<string>('editProfile:img-input', event); },
                },
                'saveButton': {
                    type: 'button',
                    text: 'Сохранить',
                    class: 'edit',
                    onclick: ()=>{ EventBus.dispatch<string>('edit:save-button'); },
                }
            },
            'errorMsgs': {
                'formError': {
                    text: errorEditFormMsg,
                    class: EditStore.get().formErrorClass,
                },
            },
        },
        'tapbar': {
            class: 'menu-profile',
        },
    }

    _createTmpl(data: any) {
        return (
            <div>
                {EditForm(this._data.editForm)}
                {Tapbar(this._data.tapbar)}
            </div>
        );
    }

    public unsubscribe() {
        EditStore.unsubscribe(this.subcribtionCallback);
    }

    private subcribtionCallback(data, view) {
        view._data.editForm.fields.name.class = data.nameFieldClass;
        view._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
        view._data.editForm.errorMsgs.formError.class = data.formErrorClass;
        view._data.editForm.tags = data.tags;
        view._data.editForm.fields.name.value = ProfileStore.get().name;
        view._data.editForm.fields.birthDate.value = ProfileStore.get().date;
        view._data.editForm.fields.description.value = ProfileStore.get().description;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
