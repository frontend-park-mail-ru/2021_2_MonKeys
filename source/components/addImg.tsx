import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';
import { IconButton } from './iconButton.js';
import EventBus from '../dispatcher/eventBus.js';

export interface ButtonProps {
    class: string;
    onchange: { (data, view?: ViewBase): void };
    imgs: string[];
}

export interface IconButtonProps {
    type: string;
    class: string;
    src: string;
    onclick?: { (data, view?: ViewBase): void };
}

const imgSequence = (imgs: string[]) => {
    const items = [];
    if (imgs === undefined || imgs.length === 0) {
        return <div class='text-without-icon'>Нет фото</div>;
    }
    imgs.forEach((element) => {
        items.push(
            <div class='add-img-item'>
                <img src={element} class='add-img-item' alt='' />
                {IconButton({
                    type: 'button',
                    class: 'add-img-delete',
                    src: 'icons/button_delete_white.svg',
                    onclick: () => {
                        EventBus.dispatch('edit:img-delete', element);
                    },
                })}
            </div>
        );
    });
    return items;
};

export const AddImg = (props: ButtonProps) => {
    return (
        <div class='add-img-box'>
            {imgSequence(props.imgs)}
            <label for={'AddImg'} class={props.class} />
            <input
                id={'AddImg'}
                type={'file'}
                onchange={props.onchange}
                style={'visibility: hidden;'}
                accept={'.jpg, .jpeg, .png'}
            />
        </div>
    );
};
