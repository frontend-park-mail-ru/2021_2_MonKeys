import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { DateField, DescriptionField, GenderField, ImgsField, NameField, PreferField, TagsField } from './fields.js';

export interface EditFormState {
    nameField;
    dateField;
    genderField;
    descriptionField;
    tagsField;
    preferField;
    imgsField;
}

export const EditForm = (state: EditFormState) => {
    return (
        <form class='edit__form'>
            {NameField(state.nameField)}
            {DateField(state.dateField)}
            {GenderField(state.genderField)}
            {DescriptionField(state.descriptionField)}
            {TagsField(state.tagsField)}
            {PreferField(state.preferField)}
            {ImgsField(state.imgsField)}
            <div class='edit__save-button-space'></div>
        </form>
    );
};
