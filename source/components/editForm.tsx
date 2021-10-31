import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { TagButton } from './tagButton.js';
import { FormField } from './formField.js';
import { ImgField } from './imgField.js';
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
    console.log(props)
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
            <div class='inputEdit'>{FormField(props.fields.name)}</div>
            <div class='inputEdit'>{FormField(props.fields.birthDate)}</div>
            <div class='inputEdit'>{FormField(props.fields.description)}</div>
            <div class='tag-container'>
                {IconButton(props.buttons.tagsButton)}
                 <span class='tags-header'>Tags</span>
               
               
                {tagField}
                </div>
            
            <div class='inputEdit'>
                {AddImg(props.buttons.imgAddButton)}
            </div>
            {ErrorMsg(props.errorMsgs.formError)}
            {Button(props.buttons.saveButton)}
        </form>
    );
};
