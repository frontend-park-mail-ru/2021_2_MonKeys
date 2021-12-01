import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../common/formField.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { ImgField } from './imgField.js';
import { ItemList } from './itemList.js';
import { DescriptionField } from './descriptionField.js';

export interface EditFormProps {
    fields;
    tags;
    buttons;
    errorMsgs;
}

export const EditForm = (props: EditFormProps) => {
    return (
        <div class='edit__scroll'>
            <form class='form edit__form'>
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
            </form>
        </div>
    );
};
