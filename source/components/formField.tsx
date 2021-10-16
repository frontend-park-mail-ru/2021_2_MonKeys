import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface formFieldProps {
  tag: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name: string;
  iconSrc?: string;
  class: string;
}

export const FormField = (props: formFieldProps) => {
    // const className = props.isValid ? "form-field-valid" : "form-field-novalid";

    let field: any;

    switch (props.tag) {
      case 'input':
        if (props.value !== undefined) {
          field = (
            <input
              type={props.type}
              name={props.name}
              placeholder={props.placeholder}
              class={props.class}
              value={props.value}
            />
          );
        } else {
          field = (
            <input
              type={props.type}
              name={props.name}
              placeholder={props.placeholder}
              class={props.class}
            />
          );
        }
        break;
      case 'textarea':
        if (props.value !== undefined) {
          field = (
            <textarea
              name={props.name}
              placeholder={props.placeholder}
              class={props.class}
              defaultValue={props.value}
            />
          );
        } else {
          field = (
            <textarea
              name={props.name}
              placeholder={props.placeholder}
              class={props.class}
            />
          );
        }
        break;
    }

    let fieldTmpl: any;
    if (props.iconSrc !== undefined) {
      fieldTmpl = (
        <div class="input-with-icon">
          {field}
          <img src={props.iconSrc} 
              class="input-icon" />
        </div>
      );
    } else {
      fieldTmpl = (
        <div class="input-with-icon">
          {field}
        </div>
      );
    }

    return fieldTmpl;
};
