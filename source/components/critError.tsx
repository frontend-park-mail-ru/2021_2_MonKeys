import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Button } from "./button";
import EventBus from "../dispatcher/eventBus";

export interface CritErrorProps {
    title: string;
    text: string;
    loading: boolean;
}

export const CritError = (props: CritErrorProps) => {
    const className = props.loading ? 'crit-error-container-active' : 'crit-error-container-disactive';
    return (
        <div class={className}>
            <div class={'crit-error-header'}>
              <img src='icons/icon_error_red.svg' class='menu-icon crit-error-icon' />
              <h1 class='crit-error-title'>{props.title}</h1>
            </div>
            <div class='crit-error-message'>{props.text}</div>
        </div>
    );
};
