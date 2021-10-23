import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { EditForm } from "../components/editForm.js";
import EventBus from "../dispatcher/eventBus.js"
import { EditStore } from "../store/editStore.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from "../constants/errorMsg.js";


export default class SignupEditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe((data) => {
            this._data.editForm.fields.name.class = data.nameFieldClass;
            this._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
            this._template = (
                <div>
                    {EditForm(this._data.editForm)}
                </div>
            );
            console.log('tyt');
            this.render();
        })
        console.log(EditStore.get().nameFieldClass);
        this._data.editForm.fields.name.class = EditStore.get().nameFieldClass;
        this._data.editForm.fields.birthDate.class = EditStore.get().birthDateFieldClass;
    }

    _data = {
        'editForm': {
            'fields': {
                'name': {
                    tag: 'textarea',
                    placeholder: 'Имя',
                    name: 'userName',
                    class: EditStore.get().nameFieldClass,
                    oninput: () => { EventBus.dispatch<string>('edit:name-input'); },
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    class: '',
                    name: 'birthDate',
                },
                'description': {
                    tag: 'textarea',
                    placeholder: 'Расскажите о себе',
                    name: 'description',
                    class: 'form-field-desc text-desc',
                }
            },
            'tags': {
                1: {
                    text: 'anime',
                    isActive: false,
                },
                2: {
                    text: 'BMSTU',
                    isActive: false,
                },
                3: {
                    text: 'films',
                    isActive: false,
                }
            },
            'buttons': {
                'imgAddButton': {
                    type: 'button',
                    text: '',
                    class: 'add',
                    onclick: ()=>{},
                },
                'saveButton': {
                    type: 'button',
                    text: 'Сохранить',
                    class: 'edit',
                    onclick: ()=>{ EventBus.dispatch<string>('signup-edit:save-button'); },
                }
            },
        },
    }
    _template = (
        <div>
            {EditForm(this._data.editForm)}
        </div>
    );
}