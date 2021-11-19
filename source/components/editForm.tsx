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
        <form class='flex_box_column_center'>
            <span class='header-medium'>Профиль</span>
            {FormField(props.fields.name)}
            {ErrorMsg(props.errorMsgs.nameError)}
            {FormField(props.fields.birthDate)}
            {ErrorMsg(props.errorMsgs.ageError)}
            {FormField(props.fields.description)}
            {/* <div class='form-field-input'>
                <div class='tag-container'>
                    <div class='tags-header'>
                        {IconButton(props.buttons.tagsButton)}
                        <span>Tags</span>
                    </div>
                    {tagField}
                </div>
            </div> */}

            {/* <div class='form-field-input'>
                {AddImg(props.fields.img, props.buttons.imgAddButton)}
                {ErrorMsg(props.errorMsgs.imgError)}
            </div> */}
            {/* ErrorMsg(props.errorMsgs.formError)*/}
            {Button(props.buttons.saveButton)}
        </form>
    );
};
