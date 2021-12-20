import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import ViewBase from '../../views/viewBase.js';
import { IconButton } from '../common/iconButton.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface ButtonProps {
    class: string;
    onchange: { (data, view?: ViewBase): void };
    imgs: string[];
}

export interface FieldProps {
    class: string;
}

const imgSequence = (imgs: string[]) => {
    const items = [];
    if (imgs === undefined || imgs.length === 0) {
        return <div class='form__field-title img__title'>Добавьте фото</div>;
    }
    imgs.forEach((element, _, imgsArr) => {
        let deleteButton;
        if (element !== 'icons/loading-buffering.gif' && imgsArr.length > 1) {
            deleteButton = IconButton({
                type: 'button',
                class: 'add-img-delete',
                src: 'icons/remove_img.svg',
                onclick: () => {
                    EventBus.dispatch(EVENTS.EDIT_IMG_DELETE, element);
                },
            });
        } else {
            deleteButton = <div></div>;
        }
        items.push(
            <div class='add-img-item'>
                <img src={element} class='add-img-img' alt='' />
                {deleteButton}
            </div>
        );
    });
    return items;
};

export const ImgField = (imgs) => {
    const uploadPhoto = (event) => {
        EventBus.dispatch(EVENTS.EDIT_IMG_INPUT, event);
    };

    return (
        <div class='add-img-box'>
            {imgSequence(imgs)}
            <input
                class={'add-img-box__input-field'}
                id={'AddImg'}
                type={'file'}
                onchange={uploadPhoto}
                style={'visibility: hidden;'}
                accept={'.gif, .jpeg, .jpg, .png, .webp'}
            />
            <label for='AddImg'>
                <div class='add'></div>
            </label>
        </div>
    );
};
