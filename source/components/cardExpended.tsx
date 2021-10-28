import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tag } from './tag.js';
import { IconButton } from './iconButton.js';
import { ImgCarousel } from './imgCarousel.js';

export interface CardExpendedProps {
    userData: any;
    tags: any;
    buttons: any;
}

export const CardExpended = (props: CardExpendedProps) => {
    const tagsExists = props.tags !== undefined ? true : false;
    let tagField: HTMLCollection;
    if (tagsExists) {
        tagField = (
            <div class='column-container'>
                <div class='center-container'>{Object.keys(props.tags).map((item) => Tag(props.tags[item]))}</div>
            </div>
        );
    } else {
        tagField = <div class='column-container'></div>;
    }
    const descExists = props.userData.description !== undefined ? true : false;
    let descField: HTMLCollection;
    if (descExists) {
        descField = <div class='card-el desc'>{props.userData.description}</div>;
    } else {
        descField = <div class='card-el desc'></div>;
    }

    return (
        <div id='cardID' class='card-expand'>
            <div id='cardMainID' class='card-main-profile'>
                {/*ImgCarousel(props.userData.imgSrc, true)*/}
                <div class='name-container'>
                    <div class='name'>{props.userData.name}</div>
                    <div class='age'>{props.userData.age}</div>
                </div>
                <div class='card-el bord'></div>
                {descField}
                <div class='card-el bord'></div>

                <div id='tagsID' class='card-el tags-container'>
                    {tagField}
                </div>
            </div>
            <div id='editID' class='actions-container-profile'>
                {Object.keys(props.buttons).map((item) => IconButton(props.buttons[item]))}
            </div>
        </div>
    );
};
