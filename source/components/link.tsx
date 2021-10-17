import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface LinkProps {
    text: string;
    class: string;
    dataSection: string;
  }

export const Link = (props: LinkProps) => {
    return (
        <div class="center-container">
            <a class={props.class} data-section={props.dataSection}>{props.text}</a>
        </div>
    )
}
