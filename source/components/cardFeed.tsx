import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { IconButton } from "./iconButton.js";
import { ImgCarousel } from "./imgCarousel.js";

export interface CardFeedProps {
  userData: any;
  buttons: any;
}

export const CardFeed = (props: CardFeedProps) => {
  
  return (
    <div class="card">
        <div class="card-main">
            {ImgCarousel(props.userData.imgSrc,false)}
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