import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM";

export const Button = (props) => {
    return (
      <button type={props.type} class="button">
        <div class="center-container">
          <span class="button-text">{props.text}</span>
          <img />
        </div>
      </button>
    );
}