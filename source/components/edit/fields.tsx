import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormFieldInput, FormFieldInputProps } from './formFieldInput.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { errorAgeMsg, errorGenderMsg, errorNameMsg, errorPreferMsg } from '../../constants/errorMsg.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
import { FieldStatus, Gender } from '../../store/editStore.js';
import { Tag } from './tag.js';
import eventBus from '../../dispatcher/eventBus.js';

export const NameField = (data) => {
    const nameProps: FormFieldInputProps = {
        oninput: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_NAME_INPUT);
        },
        onfocusout: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_NAME_FOCUSOUT);
        },
        name: 'userName',
        placeholder: 'Имя',
        value: data.name,
        class: data.status === FieldStatus.Error ? 'form__field__invalid' : 'form__field',
    };

    const errorProps = {
        text: errorNameMsg,
        class: 'error-hidden',
    };

    switch (data.status) {
        case FieldStatus.Correct:
            errorProps.text = '';
            break;
        case FieldStatus.Hint:
            errorProps.class = 'error-hint';
            break;
        case FieldStatus.Error:
            errorProps.class = 'error-active';
            break;
    }

    return (
        <div class='form__element'>
            {FormFieldInput(nameProps)}
            {ErrorMsg(errorProps)}
        </div>
    );
};

export const DateField = (data) => {
    const dateProps: FormFieldInputProps = {
        oninput: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_DATE_INPUT);
        },
        onfocusout: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_DATE_FOCUSOUT);
        },
        name: 'birthDate',
        // iconSrc: 'icons/calendar.svg', TODO date
        type: 'date',
        value: data.date,
        class: data.status === FieldStatus.Error ? 'form__field__invalid' : 'form__field',
    };

    const errorProps = {
        text: errorAgeMsg,
        class: 'error-hidden',
    };

    switch (data.status) {
        case FieldStatus.Correct:
            errorProps.text = '';
            break;
        case FieldStatus.Hint:
            errorProps.class = 'error-hint';
            break;
        case FieldStatus.Error:
            errorProps.class = 'error-active';
            break;
    }

    return (
        <div class='form__element'>
            {FormFieldInput(dateProps)}
            {ErrorMsg(errorProps)}
        </div>
    );
};

export const GenderField = (data) => {
    const items = [
        {
            value: 'Мужчина',
            selected: data.gender === Gender.Male,
            clickEvent: EVENTS.EDIT_GENDER_MALE_CLICK,
            class: 'field-gender__tag',
        },
        {
            value: 'Женщина',
            selected: data.gender === Gender.Female,
            clickEvent: EVENTS.EDIT_GENDER_FEMALE_CLICK,
            class: 'field-gender__tag',
        },
    ];

    const errorProps = {
        text: errorGenderMsg,
        class: 'error-hidden',
    };

    switch (data.status) {
        case FieldStatus.Correct:
            errorProps.text = '';
            break;
        case FieldStatus.Hint:
            errorProps.class = 'error-hint';
            break;
        case FieldStatus.Error:
            errorProps.class = 'error-active';
            break;
    }

    return (
        <div class='form__element'>
            <div class='form__field field-gender'>
                <span class='field-gender__title'>Ваш пол</span>
                {items.map((item) => Tag(item))}
            </div>
            {ErrorMsg(errorProps)}
        </div>
    );
};

export const DescriptionField = (data) => {
    if (!data.description) {
        data.description = '';
    }

    const props = {
        name: 'description',
        placeholder: 'Расскажите о себе',
        class: 'form__field',
    };

    return (
        <div class='form__element'>
            <div class='form__field field-description'>
                <textarea
                    class='field-description__text'
                    name={props.name}
                    placeholder={props.placeholder}
                    autocomplete='chrome-off'
                    maxlength='1000'
                >
                    {data.description}
                </textarea>
            </div>
        </div>
    );
};

export const TagsField = (data) => {
    const tags = data.tags.map((tag) => {
        return {
            value: tag.tag,
            selected: tag.selected,
            clickEvent: EVENTS.EDIT_TAG_CLICK,
            class: 'field-with-title__tag',
        };
    });

    const props = {
        expend: {
            src: data.open ? 'icons/shrink.svg' : 'icons/expand_big.svg',
            onclick: () => {
                eventBus.dispatch(EVENTS.EDIT_TAGS_CLICK);
            },
        },
    };

    let tagsTmpl = <div></div>;
    if (data.open) {
        tagsTmpl = <div class='field-with-title__tags'>{tags.map((tag) => Tag(tag))}</div>;
    }

    return (
        <div class='form__element'>
            <div class='form__field field-with-title'>
                <div class='field-with-title__title'>
                    <span class='field-with-title__title-text'>Интересы</span>
                    <img class='field-with-title__expend-icon' src={props.expend.src} onclick={props.expend.onclick} />
                </div>
                {tagsTmpl}
            </div>
        </div>
    );
};

export const PreferField = (data) => {
    console.log(data.prefers);
    const items = data.prefers.map((prefer) => {
        return {
            value: prefer.value,
            selected: prefer.selected,
            clickEvent: EVENTS.EDIT_PREFER_CLICK,
        };
    });

    const errorProps = {
        text: errorPreferMsg,
        class: 'error-hidden',
    };

    switch (data.status) {
        case FieldStatus.Correct:
            errorProps.text = '';
            break;
        case FieldStatus.Hint:
            errorProps.class = 'error-hint';
            break;
        case FieldStatus.Error:
            errorProps.class = 'error-active';
            break;
    }

    return (
        <div class='form__element'>
            <div class='form__field field-with-title'>
                <div class='field-with-title__title'>
                    <span class='field-with-title__title-text'>Кого вы ищете</span>
                </div>
                <div class='field-with-title__prefers'>{items.map((item) => Tag(item))}</div>
            </div>
            {ErrorMsg(errorProps)}
        </div>
    );
};
