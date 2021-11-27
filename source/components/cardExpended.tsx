import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import EventBus from '../dispatcher/eventBus.js';

import { Tag } from './tag.js';

import { ProfileData } from '../store/profileStore.js';

import { ImgCard } from './imgCard.js';
import { Button } from './button.js';
import { ReportWindow } from './reportWindow.js';

export interface CardExpendedProps {
    userData: ProfileData;

    withActions: boolean;
    withReports: boolean;
    feed?: boolean;

    reports?: string[];
    reported?: boolean;
}

export const CardExpended = (props: CardExpendedProps) => {
    if (!props.userData) {
        return <div></div>;
    }
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
        imgTmpl = <img class={'img-card__img img-card__img_size_medium'} src={props.userData.imgs[0]} />;
        nameTmpl = (
            <div class='img-card__name-age img-card__name-age_size_small'>
                {props.userData.name + ', ' + props.userData.age}
            </div>
        );
    }
    if (props.feed) {
        imgTmpl = ImgCard({ userData: props.userData, size: 'medium', expanded: true, feed: true });
        nameTmpl = <div></div>;
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
    console.log(props.reports);
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
};
