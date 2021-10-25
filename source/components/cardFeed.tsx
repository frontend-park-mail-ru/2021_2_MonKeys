import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { IconButton } from "./iconButton.js";

export interface CardFeedProps {
  userData: any;
  buttons: any;
}

export const CardFeed = (props: CardFeedProps) => {
  console.log(props.userData.imgSrc);
  return (
    <div class="card">
        <div class="card-main">
            <img src={props.userData.imgSrc[0]} class="profile-image"/>
            <div class="bottom-panel">
                <div class="name-container">
                    <div class="name">{props.userData.name}</div>
                    <div class="age">{props.userData.age}</div>
                </div>
                <div class="actions-container">
                    {Object.keys(props.buttons).map(item => IconButton(props.buttons[item]))}
                </div>
            </div>
        </div>
    </div>
  );
}
