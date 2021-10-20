import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { FormField } from "../components/formField.js";
import { TagField } from "../components/tagField.js";
import { ImgField } from "../components/imgField.js";
import { Button } from "../components/button.js";
import { Tapbar } from "../components/tapbar.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from "../constants/errorMsg.js";


export default class EditView extends ViewBase {
    _data = {
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
        'tapbar': {
            class: 'menu-profile',
        },
    }
    _template = (
        <div>
            <form class="edit-form">
                <div class="inputEdit">
                    {FormField(this._data.fields.name)}
                </div>
                <div class="inputEdit">
                    {FormField(this._data.fields.birthDate)}
                </div>
                <div class="inputEdit">
                    {FormField(this._data.fields.description)}
                </div>
                <div class="tag-container">
                    <div class="column-container">
                        <span class="tags-header">Tags</span>
                        <div class="center-container">
                            {Object.keys(this._data.tags).map(item => TagField(this._data.tags[item]))}
                        </div>
                    </div>
                </div>
                <div class="inputEdit">
                    {ImgField()}
                    {Button(this._data.buttons.imgAddButton)}
                </div>
                {Button(this._data.buttons.saveButton)}
            </form>
            {Tapbar(this._data.tapbar)}
        </div>
    );
}
