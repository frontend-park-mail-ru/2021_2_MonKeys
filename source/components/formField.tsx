import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM";

export interface formFieldProps {
    placeholder: string;
    type: string;
    name: string;
    iconSrc: string;
    isValid: boolean;
}

export const FormField = (props) => {
    const className =props.isValid ? "form-field-valid" : "form-field-novalid"; 
    return (
    <div class="input-with-icon">
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        class={className}
      />
      <img src={props.iconSrc} 
           class="input-icon" />
    </div>
  );
};
