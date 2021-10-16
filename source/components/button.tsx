import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface ButtonProps {
  type: string;
  text: string;
  class: string;
}

export const Button = (props: ButtonProps) => {
  let className: string;
  switch (props.class) {
    case 'login':
      className = 'login-button';
      break;
    case 'signup':
      className = 'signup-button';
      break;
    case 'add':
      className = 'add';
      break;
    case 'edit':
      className = 'edit-button';
      break;
    case 'link':
      break;
  }
  
  const withText = (props.text === undefined) ? false : true;
  const textClassName = className + '-text';
  return (
    <button type={props.type} class={className}>
      <div class="center-container">
        <span class={textClassName}>{props.text}</span>
      </div>
    </button>
  );
}