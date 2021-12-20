import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { DateField, DescriptionField, GenderField, NameField, PreferField, TagsField } from './fields.js';

export interface EditFormProps {
    nameField;
    dateField;
    genderField;
    descriptionField;
    tagsField;
    preferField;
}

export const EditForm = (props: EditFormProps) => {
    return (
        <form class='edit__form'>
            {NameField(props.nameField)}
            {DateField(props.dateField)}
            {GenderField(props.genderField)}
            {DescriptionField(props.descriptionField)}
            {TagsField(props.tagsField)}
            {PreferField(props.preferField)}

            {/*<div class='form-field-input'>*/}
            {/*    {ImgField(props.fields.img, props.buttons.imgAddButton)}*/}
            {/*</div>*/}
            <div class='edit__save-button-space'></div>
        </form>
    );
};
