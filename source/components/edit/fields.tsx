import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormFieldInput, FormFieldInputProps } from './formFieldInput.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { errorAgeMsg, errorGenderMsg, errorImgMsg, errorNameMsg, errorPreferMsg } from '../../constants/errorMsg.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
import { FieldStatus, Gender } from '../../store/editStore.js';
import { Tag } from './tag.js';
import { ImgField } from './imgField.js';
import { Box, OpeningBox } from './Box.js';

const notError = {
    text: '',
    status: FieldStatus.Correct,
};

const BaseField = ({ fieldTmpl, classField = '', error = notError, anchor = '' }) => {
    const errorProps = {
        text: error.text,
        class: 'error-hidden',
    };

    switch (error.status) {
        case FieldStatus.Hint:
            errorProps.class = 'error-hint';
            classField += ' form__field';
            break;
        case FieldStatus.Error:
            errorProps.class = 'error-active';
            classField += ' form__field__invalid';
            break;
        default:
            errorProps.text = '';
            classField += ' form__field';
            break;
    }

    return (
        <div class='form__element' id={anchor}>
            <div class={classField}>{fieldTmpl}</div>
            {ErrorMsg(errorProps)}
        </div>
    );
};

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
        class: 'field__input',
        type: 'text',
    };

    const error = {
        text: errorNameMsg,
        status: data.status,
    };

    return BaseField({
        fieldTmpl: FormFieldInput(nameProps),
        classField: '',
        error: error,
        anchor: 'name',
    });
};

export const DateField = (data) => {
    const birthDate = data.date;
    let birthDay = '';
    let birthMonth = '';
    let birthYear = '';
    if (birthDate) {
        const dates = birthDate.split('-');
        birthYear = dates[0];
        birthMonth = dates[1];
        birthDay = dates[2];
    }
    const dayProps: FormFieldInputProps = {
        oninput: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_DAY_INPUT);
        },
        onfocusout: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_DAY_FOCUSOUT);
        },
        name: 'birthDay',
        type: 'text',
        value: birthDay,
        placeholder: 'дд',
        class: 'field__input field-data__day',
        maxlength: 2,
        pattern: 'd*',
    };
    const monthProps: FormFieldInputProps = {
        oninput: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_MONTH_INPUT);
        },
        onfocusout: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_MONTH_FOCUSOUT);
        },
        name: 'birthMonth',
        type: 'text',
        value: birthMonth,
        placeholder: 'мм',
        class: 'field__input  field-data__month',
        maxlength: 2,
        pattern: 'd*',
    };
    const yearProps: FormFieldInputProps = {
        oninput: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_YEAR_INPUT);
        },
        onfocusout: () => {
            EventBus.dispatch<string>(EVENTS.EDIT_BIRTH_YEAR_FOCUSOUT);
        },
        name: 'birthYear',
        type: 'text',
        value: birthYear,
        placeholder: 'гггг',
        class: 'field__input field-data__year',
        maxlength: 4,
        pattern: 'd*',
    };

    const error = {
        text: errorAgeMsg,
        status: data.status,
    };

    return BaseField({
        fieldTmpl: (
            <div class='field-data'>
                <img src='icons/calendar.svg' class='field-data__icon' />
                {FormFieldInput(dayProps)}
                {FormFieldInput(monthProps)}
                {FormFieldInput(yearProps)}
            </div>
        ),
        classField: '',
        error: error,
        anchor: 'date',
    });
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

    const error = {
        text: errorGenderMsg,
        status: data.status,
    };

    const genderTmpl = [];
    genderTmpl.push(<span class='form__field-title field-gender__title'>Ваш пол</span>);
    items.forEach((item) => genderTmpl.push(Tag(item)));

    return BaseField({
        fieldTmpl: genderTmpl,
        classField: 'field-gender',
        error: error,
        anchor: 'gender',
    });
};

export const DescriptionField = (data) => {
    if (!data.description) {
        data.description = '';
    }
    const descriptionTmpl = (
        <textarea
            class='field-description__text'
            name='description'
            placeholder='Расскажите о себе'
            autocomplete='chrome-off'
            maxlength='1000'
        >
            {data.description}
        </textarea>
    );

    return BaseField({
        fieldTmpl: descriptionTmpl,
        classField: 'field-description',
    });
};

export const TagsField = (data) => {
    const tags = data.tags.map((tag) => {
        return {
            value: tag.tag,
            selected: tag.selected,
            clickEvent: EVENTS.EDIT_TAG_CLICK,
            class: 'field__tag',
        };
    });

    return BaseField({
        fieldTmpl: OpeningBox({
            titleText: 'Интересы',
            isOpen: data.open,
            eventOpening: EVENTS.EDIT_TAGS_CLICK,
            bodyItems: tags,
            bodyClass: 'field__tags',
        }),
    });
};

export const PreferField = (data) => {
    const items = data.prefers.map((prefer) => {
        return {
            value: prefer.value,
            selected: prefer.selected,
            clickEvent: EVENTS.EDIT_PREFER_CLICK,
        };
    });

    const error = {
        text: errorPreferMsg,
        status: data.status,
    };

    return BaseField({
        fieldTmpl: Box({
            titleText: 'Кого вы ищете',
            bodyItems: items,
            bodyClass: 'field__prefers',
        }),
        error: error,
        anchor: 'prefer',
    });
};

export const ImgsField = (data) => {
    const error = {
        text: errorImgMsg,
        status: data.status,
    };

    return BaseField({
        fieldTmpl: ImgField(data.imgs),
        error: error,
        anchor: 'imgs',
    });
};
