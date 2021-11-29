import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import ViewBase from '../../views/viewBase.js';
import { IconButton } from '../common/iconButton.js';
import EventBus from '../../dispatcher/eventBus.js';

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
        return <div class='add-img__no-photo-text'>Нет фото</div>;
    }
    imgs.forEach((element) => {
        items.push(
            <div class='add-img-item'>
                <img src={element} class='add-img-item' alt='' />
                {IconButton({
                    type: 'button',
                    class: 'add-img-delete',
                    src: 'icons/remove_img.svg',
                    onclick: () => {
                        EventBus.dispatch('edit:img-delete', element);
                    },
                })}
            </div>
        );
    });
    return items;
};

export const ImgField = (fieldProps: FieldProps, buttonProps: ButtonProps) => {
    return (
        <div class={fieldProps.class}>
            {imgSequence(buttonProps.imgs)}
            <label for={'AddImg'} class={'add'} />
            <input
                id={'AddImg'}
                type={'file'}
                onchange={buttonProps.onchange}
                style={'visibility: hidden;'}
                accept={'.gif, .jpeg, .jpg, .png, .webp'}
            />
        </div>
    );
};
