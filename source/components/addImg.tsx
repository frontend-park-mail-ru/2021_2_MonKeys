import {MonkeysVirtualDOM} from "../virtualDOM/virtualDOM.js";

export interface ButtonProps {
  class: string;
  onchange: Function;
}

export const AddImg = (props: ButtonProps) => {
  return (
    <div>
      <label for={'AddImg'} class={props.class} />
      <input id={'AddImg'} type={'file'} onchange={props.onchange} style={'visibility: hidden;'} accept={".jpg, .jpeg, .png"}/>
    </div>
  );
}
