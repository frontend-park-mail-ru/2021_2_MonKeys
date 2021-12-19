import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { DateField, DescriptionField, GenderField, NameField, TagsField } from './fields.js';

export interface EditFormProps {
    nameField;
    dateField;
    genderField;
    descriptionField;
    tagsField;
}

export const EditForm = (props: EditFormProps) => {
    return (
        <form class='form edit__form'>
            {NameField(props.nameField)}
            {DateField(props.dateField)}
            {GenderField(props.genderField)}
            {DescriptionField(props.descriptionField)}
            {TagsField(props.tagsField)}

            {/*{ItemList(props.preferField)}*/}
            {/*<div class='form-field-input'>*/}
            {/*    {ImgField(props.fields.img, props.buttons.imgAddButton)}*/}
            {/*</div>*/}
        </form>
    );
};
