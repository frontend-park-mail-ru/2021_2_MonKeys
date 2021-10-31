import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface ButtonProps {
    class: string;
    onchange: { (data, view?: ViewBase): void };
}

export const AddImg = (props: ButtonProps) => {
    return (
        <div>
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
