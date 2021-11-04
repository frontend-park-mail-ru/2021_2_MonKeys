import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface CritErrorProps {
    text: string;
    loading?: boolean;
}

export const CritError = (props: CritErrorProps) => {
    return (
        <div class='crit-error-container'>
            <img src='icons/icon_error_red.svg' class='menu-icon crit-error-icon' />
            <div class='crit-error-message'>{props.text}</div>
        </div>
    );
};
