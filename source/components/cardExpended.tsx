import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import EventBus from '../dispatcher/eventBus.js';
import reactions from '../constants/reactions.js';
import { Tag } from './tag.js';
import { IconButton } from './iconButton.js';
import { ImgCarousel } from './imgCarousel.js';
import { ProfileData } from '../store/profileStore.js';
import { CardActions } from './cardActions.js';
import { ImgCard } from './imgCard.js';
import { Button } from './button.js';
import { ReportWindow } from './reportWindow.js';

export interface CardExpendedProps {
    userData: ProfileData;

    withActions: boolean;
    withReports: boolean;

    reports?: string[];
    reported?: boolean;
}

export const CardExpended = (props: CardExpendedProps) => {
    const tagsExists = props.userData.tags !== undefined ? true : false;
    let tagField: HTMLCollection;
    if (tagsExists) {
        tagField = (
            <div class='card-expended__tags'>
                {Object.keys(props.userData.tags).map((item) => Tag(props.userData.tags[item]))}
            </div>
        );
    } else {
        tagField = <div class='card-expended__tags'></div>;
    }
    const descExists = props.userData.description !== undefined ? true : false;
    let descField: HTMLCollection;
    if (descExists) {
        descField = <div class='card-expended__description'>{props.userData.description}</div>;
    } else {
        descField = <div class='card-expended__description'></div>;
    }
    let imgTmpl: HTMLAllCollection;
    let nameTmpl: HTMLAllCollection;
    if (props.withActions) {
        imgTmpl = ImgCard({ userData: props.userData, size: 'medium', expanded: false });
        nameTmpl = <div></div>;
    } else {
        imgTmpl = <img class={'img-card__img img-card__img_size_medium'} />;
        nameTmpl = (
            <div class='img-card__name-age img-card__name-age_size_small'>
                {props.userData.name + ', ' + props.userData.age}
            </div>
        );
    }
    const reportButtonAction = () => {
        EventBus.dispatch<string>('reports:report-button');
    };
    const reportButtonTmpl = props.withReports ? (
        <div class='card-expended__report-button'>
            {Button({
                type: 'button',
                text: 'Пожаловаться',
                class: 'button-black-big button-black-big_margin-bottom',
                onclick: reportButtonAction,
            })}
        </div>
    ) : (
        <div></div>
    );
    const reportWindowTmpl = props.withReports ? (
        ReportWindow({ reports: props.reports, reportedUserID: props.userData.id, visible: props.reported })
    ) : (
        <div></div>
    );

    return (
        <div class='card-expended'>
            {reportWindowTmpl}
            <div class='card-profile'>
                {imgTmpl}
                {nameTmpl}
                {descField}
                {tagField}
                {reportButtonTmpl}
            </div>
        </div>
    );
    // let tags;
    // if (props.userData.tags) {
    //     tags = props.userData.tags;
    // } else if (props.tags) {
    //     tags = props.tags;
    // }
    // const tagsExists = tags !== undefined ? true : false;
    // let tagField: HTMLCollection;
    // if (tagsExists) {
    //     tagField = (
    //         <div class='column-container'>
    //             <div class='center-container'>{Object.keys(tags).map((item) => Tag(tags[item], false))}</div>
    //         </div>
    //     );
    // } else {
    //     tagField = <div class='column-container'></div>;
    // }
    // const descExists = props.userData.description !== undefined ? true : false;
    // let descField: HTMLCollection;
    // if (descExists) {
    //     descField = <div class='card-el desc'>{props.userData.description}</div>;
    // } else {
    //     descField = <div class='card-el desc'></div>;
    // }
    // return (
    //     <div id='cardID' class='card-expand'>
    //         <div id='cardMainID' class='card-main-profile'>
    //             {ImgCarousel(props.userData.imgs, true)}
    //             <div class='name-container'>
    //                 <div class='name'>{props.userData.name}</div>
    //                 <div class='age'>{props.userData.age}</div>
    //             </div>
    //             <div class='card-el bord'></div>
    //             {descField}
    //             <div class='card-el bord'></div>

    //             <div id='tagsID' class='card-el tags-container'>
    //                 {tagField}
    //             </div>
    //         </div>
    //         <div id='editID' class='actions-container'>
    //             {Object.keys(props.buttons).map((item) => IconButton(props.buttons[item]))}
    //         </div>
    //     </div>
    // );
};
