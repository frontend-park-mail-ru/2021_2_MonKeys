import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import EventBus from '../../dispatcher/eventBus.js';

import { Tag } from '../common/tag.js';

import { ProfileData } from '../../store/profileStore.js';

import { ImgCard } from './imgCard.js';
import { Button } from '../common/button.js';
import { ReportWindow } from '../report/reportWindow.js';

export interface CardExpendedProps {
    userData: ProfileData;

    withActions: boolean;
    withReports: boolean;
    withBackButton?: boolean;
    feed?: boolean;

    reports?: string[];
    reported?: boolean;
}

export const CardExpended = (props: CardExpendedProps) => {
    const tagsExists = props.userData.tags !== undefined ? true : false;
    let tagField: HTMLCollection;
    if (tagsExists) {
        tagField = (
            <div class='flex_box_row_left'>
                {Object.keys(props.userData.tags).map((item) => Tag(props.userData.tags[item]))}
            </div>
        );
    } else {
        tagField = <div class='flex_box_row_left'></div>;
    }
    const descExists = props.userData.description !== undefined ? true : false;
    let descField: HTMLCollection;
    if (descExists) {
        descField = <div class='card-expended__description'>{props.userData.description}</div>;
    } else {
        descField = <div class='card-expended__description'></div>;
    }
    let imgTmpl: HTMLAllCollection;
    if (props.feed) {
        imgTmpl = ImgCard({
            userData: props.userData,
            size: 'medium',
            withActions: props.withActions,
            expanded: true,
            feed: props.feed,
        });
    } else {
        imgTmpl = ImgCard({
            userData: props.userData,
            size: 'medium',
            withActions: props.withActions,
            expanded: false,
        });
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
    const backProfileButtonClick = () => {
        EventBus.dispatch<number>('chat:back-to-chat-button', props.userData.id);
    };
    const backProfileButton = props.withBackButton ? (
        <div class='card-expended__back-button'>
            {Button({
                type: 'button',
                text: 'Назад',
                class: 'button-white-big',
                onclick: backProfileButtonClick,
            })}
        </div>
    ) : (
        <div></div>
    );

    return (
        <div class='card-expended'>
            {reportWindowTmpl}
            <div class='card-expended__profile'>
                {imgTmpl}
                {descField}
                {tagField}
                {backProfileButton}
                {reportButtonTmpl}
            </div>
        </div>
    );
};
