import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { TagButton } from './tagButton.js';
import { FormField } from './formField.js';
import { ErrorMsg } from './errorMsg.js';
import { Button } from './button.js';
import { AddImg } from './addImg.js';
import { IconButton } from '../components/iconButton.js';

export interface EditFormProps {
    fields;
    tags;
    buttons;
    errorMsgs;
}

export const EditForm = (props: EditFormProps) => {
    const tagsExists = props.tags !== undefined ? true : false;
    let tagField: HTMLCollection;
    if (tagsExists) {
        tagField = (
            <div class='column-container'>
                <div class='center-container'>
                    {Object.keys(props.tags.allTags).map((item) => TagButton(props.tags.allTags[item]))}
                </div>
            </div>
        );
    } else {
        tagField = <div class='column-container'></div>;
    }
    return (
        <form class='edit-form'>
            <span class='page-header-small'>Профиль</span>
            <div class='form-field-input'>
                {FormField(props.fields.name)}
                {ErrorMsg(props.errorMsgs.nameError)}
            </div>
            <div class='form-field-input'>
                {FormField(props.fields.birthDate)}
                {ErrorMsg(props.errorMsgs.ageError)}
            </div>
            <div class='form-field-input'>{FormField(props.fields.description)}</div>
            <div class='form-field-input'>
                <div class='tag-container'>
                    <div class='tags-header'>
                        {IconButton(props.buttons.tagsButton)}
                        <span>Tags</span>
                    </div>
                    {tagField}
                </div>
            </div>

            <div class='form-field-input'>
                {AddImg(props.fields.img, props.buttons.imgAddButton)}
                {ErrorMsg(props.errorMsgs.imgError)}
            </div>
            {ErrorMsg(props.errorMsgs.formError)}
            {Button(props.buttons.saveButton)}
        </form>
    );
};
