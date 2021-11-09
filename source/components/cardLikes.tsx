import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface CardLikesProps {
    name: string;
    age: string;
    date?: string;
    imgs: string[];
}

export const CardLikes = (props: CardLikesProps) => {
    console.log(props);
    return (
        <div class='likes-card'>
            <div class='likes-card-inside'>
                <img src={props.imgs[0]} class='likes-img' />
                <div class='likes-name-date'>
                    <div class='name-container'>
                        <div class='name'>{props.name}</div>
                        <div class='age'>{props.age}</div>
                    </div>
                    {/* <div class='likes-data'>You matched on {props.date}</div> */}
                </div>
            </div>
        </div>
    );
};
