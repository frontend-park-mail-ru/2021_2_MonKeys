import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import eventBus from '../dispatcher/eventBus.js';
import reactions from '../constants/reactions.js';
import { Tag } from './tag.js';
import { IconButton } from './iconButton.js';
import { ImgCarousel } from './imgCarousel.js';

export const DescriptionField = (props) => {
    if (props.value) {
        return (
            <textarea
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                placeholder={props.placeholder}
                class={props.class}
                autocomplete='chrome-off'
            >
                {props.value}
            </textarea>
        );
    } else {
        return (
            <textarea
                oninput={props.oninput}
                onfocusout={props.onfocusout}
                name={props.name}
                placeholder={props.placeholder}
                class={props.class}
                autocomplete='chrome-off'
            ></textarea>
        );
    }
};
