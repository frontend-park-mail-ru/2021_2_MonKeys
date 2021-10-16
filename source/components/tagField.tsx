import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface tagFieldProps {
  text: string;
  isActive: boolean;
}

export const TagField = (props: tagFieldProps) => {
    const tag = (props.isActive) ? 
    (
        <input type="checkbox" class="tag-checkbox" checked></input>
    ) :
    (
        <input type="checkbox" class="tag-checkbox"></input>
    );

    return (
        <label class="checkbox-btn">
            {tag}
            <span>{props.text}</span>
        </label>
    );
};
