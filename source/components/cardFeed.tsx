import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { IconButton } from './iconButton.js';
import { ImgCarousel } from './imgCarousel.js';
import { ProfileData } from '../store/profileStore.js';

export interface CardFeedProps {
    userData: ProfileData;
    buttons;
}

export const CardFeed = (props: CardFeedProps) => {
    return (
        <div class='card'>
            
                {ImgCarousel(props.userData.imgs, false)}
                <div class='card-bottom-panel'>
                    <div class='card-bottom-panel__name'>
                        {props.userData.name}
                        {props.userData.age}
                    </div>
                    <div class='actions-container'>
                        {Object.keys(props.buttons).map((item) => IconButton(props.buttons[item]))}
                    </div>
                </div>
        </div>
     
    );
};
