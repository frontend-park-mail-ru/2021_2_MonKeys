import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface CardLikesProps {
    name: string;
    age: string;
    photoSrc: string;
    date: string;
}

export const CardLikes = (props: CardLikesProps) => {
    return (
        <div class='likes-card'>
            <div class='likes-card-inside'>
                <img src={props.photoSrc} class='likes-img' />
                <div class='likes-name-date'>
                    <div class='name-container'>
                        <div class='name'>{props.name}</div>
                        <div class='age'>{props.age}</div>
                    </div>
                    <div class='likes-data'>You matched on {props.date}</div>
                </div>
            </div>
        </div>
    );
};
