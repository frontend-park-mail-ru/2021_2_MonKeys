import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../common/formField.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { ImgField } from './imgField.js';
import { ItemList } from './itemList.js';
import { DescriptionField } from './descriptionField.js';
import { NameField } from './fields.js';

export interface EditFormProps {
    nameField;
}

export const EditForm = (props: EditFormProps) => {

    return (
        <div class='edit__scroll'>
            <form class='form edit__form'>
                {NameField(props.nameField)}

                {/*{FormField(props.birthDate)}*/}
                {/*{ItemList(props.genderField)}*/}
                {/*{DescriptionField(props.description)}*/}
                {/*{ItemList(props.tagsField)}*/}
                {/*{ItemList(props.preferField)}*/}
                {/*<div class='form-field-input'>*/}
                {/*    {ImgField(props.fields.img, props.buttons.imgAddButton)}*/}
                {/*</div>*/}
            </form>
        </div>
    );
};
