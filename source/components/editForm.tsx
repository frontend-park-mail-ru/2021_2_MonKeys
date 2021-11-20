import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { TagButton } from './tagButton.js';
import { FormField } from './formField.js';
import { ErrorMsg } from './errorMsg.js';
import { Button } from './button.js';
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
            {ItemList({
                title: 'Ваш пол',
                valid: true,
                open: true,
                items: [
                    {
                        value: 'мужчина',
                        selected: false,
                    },
                    {
                        value: 'женщина',
                        selected: false,
                    },
                ],
            })}
            {DescriptionField(props.fields.description)}

            {ItemList({
                title: 'Предпочтения',
                valid: true,
                open: true,
                items: [
                    {
                        value: 'hello',
                        selected: false,
                    },
                    {
                        value: 'check',
                        selected: false,
                    },
                    {
                        value: 'chsds',
                        selected: false,
                    },
                    {
                        value: 'check',
                        selected: false,
                    },
                    {
                        value: 'chsds',
                        selected: true,
                    },
                ],
            })}
            {ItemList({
                title: 'Предпочтения',
                valid: true,
                open: false,
                items: [
                    {
                        value: 'Мужчины',
                        selected: false,
                    },
                    {
                        value: 'Женщины',
                        selected: false,
                    },
                ],
            })}
            <div class='form-field-input'>
                {ImgField(props.fields.img, props.buttons.imgAddButton)}
                {ErrorMsg(props.errorMsgs.imgError)}
            </div>
            {/* ErrorMsg(props.errorMsgs.formError)*/}
            {Button(props.buttons.saveButton)}
        </form>
    );
};
