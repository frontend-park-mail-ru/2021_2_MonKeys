import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface errorMsgProps {
    text: string;
    isVisiable: boolean;
}

export const ErrorMsg = (props: errorMsgProps) => {
    const className = props.isVisiable ? "login-error-active" : "login-error"; 
    return (
      <div name="error" class={className}>{props.text}</div>
  );
};
