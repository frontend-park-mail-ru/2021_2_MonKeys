import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface LinkProps {
    text: string;
    class: string;
    dataSection: string;
    route: string;
  }

export const Link = (props: LinkProps) => {
    return (
        <div class="center-container">
            <mon-router route={props.route}>
            <a class={props.class} data-section={props.dataSection}>{props.text}</a>
            </mon-router>
        </div>
    )
}
