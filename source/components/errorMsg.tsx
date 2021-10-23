import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface errorMsgProps {
    text: string;
    class: string;
}

export const ErrorMsg = (props: errorMsgProps) => {
    // const className = props.isVisiable ? "login-error-active" : "login-error"; 
    return (
      <div name="error" class={props.class}>{props.text}</div>
  );
};
