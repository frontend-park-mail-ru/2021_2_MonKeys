import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tag } from "./tag.js";
import { IconButton } from "./iconButton.js";

export interface CardExpendedProps {
  userData: any;
  tags: any;
  buttons: any;
}

export const CardExpended = (props: CardExpendedProps) => {
  return (
    <div id="cardID" class="card-expand">
        <div id="cardMainID" class="card-main-profile">
            <img src={props.userData.imgSrc}
                class="card-el profile-image-expand" />
            <div class="name-container">
                <div class="name">{props.userData.name}</div>
                <div class="age">{props.userData.age}</div>
            </div>
            <div class="card-el bord"></div>
            <div class="card-el desc">{props.userData.description}</div>
            <div class="card-el bord"></div>
            <div id="tagsID" class="card-el tags-container">
                {/*{Object.keys(props.tags).map(item => Tag(props.tags[item]))}*/}
            </div>
        </div>
        <div id="editID" class="actions-container-profile">
            {Object.keys(props.buttons).map(item => IconButton(props.buttons[item]))}
        </div>
    </div>
  );
}
