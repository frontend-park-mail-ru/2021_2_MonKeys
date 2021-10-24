import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tapbar } from "../components/tapbar.js";
import { EditForm } from "../components/editForm.js";
import { EditStore } from "../store/editStore.js";
import { ProfileStore } from "../store/profileStore.js";
import EventBus from "../dispatcher/eventBus.js"
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from "../constants/errorMsg.js";


export default class EditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        EditStore.subscribe((data) => {
            this._data.editForm.fields.name.class = data.nameFieldClass;
            this._data.editForm.fields.birthDate.class = data.birthDateFieldClass;
            this._data.editForm.tags = data.tags;
            this._template = this._createTmpl(this._data);
            // console.log(this._data);
            // window.onload = ()=>{ EventBus.dispatch<string>('signup-edit:load'); };
            this.render();
        })
        this._template = this._createTmpl(this._data);
        // window.onload = ()=>{ EventBus.dispatch<string>('signup-edit:load'); };
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
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    value: ProfileStore.get().date,
                    class: EditStore.get().birthDateFieldClass,
                    name: 'birthDate',
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
                // как то сделать на лоад страницы
                'tagsButton': {
                    type: 'button',
                    text: 'tags',
                    clas: '',
                    onclick: ()=>{ EventBus.dispatch<string>('signup-edit:load'); },
                },
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
}
