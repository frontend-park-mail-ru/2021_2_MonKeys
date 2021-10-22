import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { TagField } from "./tagField.js";
import { FormField } from "./formField.js";
import { ImgField } from "./imgField.js";
import { Button } from "./button.js";

export interface EditFormProps {
  fields: any;
  tags: any;
  buttons: any;
}

export const EditForm = (props: EditFormProps) => {
  return (
    <form class="edit-form">
        <div class="inputEdit">
            {FormField(props.fields.name)}
        </div>
        <div class="inputEdit">
            {FormField(props.fields.birthDate)}
        </div>
        <div class="inputEdit">
            {FormField(props.fields.description)}
        </div>
        <div class="tag-container">
            <div class="column-container">
                <span class="tags-header">Tags</span>
                <div class="center-container">
                    {Object.keys(props.tags).map(item => TagField(props.tags[item]))}
                </div>
            </div>
        </div>
        <div class="inputEdit">
            {ImgField()}
            {Button(props.buttons.imgAddButton)}
        </div>
        {Button(props.buttons.saveButton)}
    </form>
  );
}