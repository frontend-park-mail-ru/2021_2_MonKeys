import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { EditForm } from "../components/editForm.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from "../constants/errorMsg.js";


export default class SignupEditView extends ViewBase {
    _data = {
        'editForm': {
            'fields': {
                'name': {
                    tag: 'textarea',
                    placeholder: 'Имя',
                    name: 'userName',
                    class: 'form-field text-without-icon',
                },
                'birthDate': {
                    tag: 'input',
                    type: 'date',
                    name: 'birthDate',
                    class: 'form-field text-with-icon',
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
                    type: 'submit',
                    text: 'Сохранить',
                    class: 'edit',
                    onclick: ()=>{},
                }
            },
        },
        'tapbar': {
            class: 'menu-profile',
        },
    }
    _template = (
        <div>
            {EditForm(this._data.editForm)}
        </div>
    );
}
