import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface IconButtonProps {
  type: string;
  class: string;
  src: string;
  onclick: Function;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <button onclick={props.onclick} type={props.type} class="menu-icon">
        <img
            src={props.src} class={props.class}
        />
    </button>
  );
}