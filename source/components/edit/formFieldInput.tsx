import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export const FormFieldInput = (props) => {
  props.value = props.value ? props.value : '';

  return (
    <div class={props.class}>
      <input
        class='field__input'
        oninput={props.oninput}
        onfocusout={props.onfocusout}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        autocomplete='off'
      />
    </div>
  );
};
