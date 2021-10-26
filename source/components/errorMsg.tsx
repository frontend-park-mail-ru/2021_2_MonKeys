import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface errorMsgProps {
    text: string;
    class: string;
}

export const ErrorMsg = (props: errorMsgProps) => {
    return (
      <div name="error" class={props.class}>{props.text}</div>
  );
};
