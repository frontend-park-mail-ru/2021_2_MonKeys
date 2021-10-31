import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface ButtonProps {
    class: string;
    onchange: { (data, view?: ViewBase): void };
    imgs: string [];
}

const imgSequence = (imgs: string[]) => {
    const items = [];
    console.log(imgs);
    if(imgs===undefined || imgs.length===0){
        return (
            <div class="text-without-icon">Нет картинок</div>
        )
    }
    imgs.forEach((element) => {
        items.push(
            <img src={element} class="add-img-item" alt=''/>
        );
    });
    return items;
}

export const AddImg = (props: ButtonProps) => {
    return (
        <div class="add-img-box">
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
