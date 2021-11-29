import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../common/formField.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { Button } from '../common/button.js';
import { ImgField } from './imgField.js';
import { ItemList } from './itemList.js';
import { DescriptionField } from './descriptionField.js';
import { IconButton } from '../common/iconButton.js';

export interface EditFormProps {
    fields;
    tags;
    buttons;
    errorMsgs;
}

export const EditForm = (props: EditFormProps, actions?) => {
    const backButton = actions ? IconButton(actions) : <div></div>;
    return (
        <form class='flex_box_column_center'>
            <span class='header-medium'>
                {backButton}
                Редактирование
            </span>
            {FormField(props.fields.name)}
            {ErrorMsg(props.errorMsgs.nameError)}
            {FormField(props.fields.birthDate)}
            {ErrorMsg(props.errorMsgs.ageError)}
            {ItemList(props.fields.genderField)}
            {ErrorMsg(props.errorMsgs.genderError)}
            {DescriptionField(props.fields.description)}
            {ItemList(props.fields.tagsField)}
            {ItemList(props.fields.preferField)}
            {ErrorMsg(props.errorMsgs.preferError)}
            <div class='form-field-input'>
                {ImgField(props.fields.img, props.buttons.imgAddButton)}
                {ErrorMsg(props.errorMsgs.imgError)}
            </div>
            {/* ErrorMsg(props.errorMsgs.formError)*/}
            {Button(props.buttons.saveButton)}
        </form>
    );
};
