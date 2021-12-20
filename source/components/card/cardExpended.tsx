import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import EventBus from '../../dispatcher/eventBus.js';

import { Tag } from '../common/tag.js';

import { ProfileData } from '../../store/profileStore.js';

import { ImgCard } from './imgCard.js';
import { ReportWindow } from '../report/reportWindow.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface CardExpendedProps {
    userData: ProfileData;

    withActions: boolean;
    withReports: boolean;
    withBackButton?: boolean;
    feed?: boolean;
    chats?: boolean;
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
        EventBus.dispatch<string>(EVENTS.REPORTS_REPORT_BUTTON);
    };
    const reportButtonTmpl = props.withReports ? (
        <button type='button' onclick={reportButtonAction} class='report-button'>
            <span class='report-button__text'>Пожаловаться</span>
        </button>
    ) : (
        <div></div>
    );
    const reportWindowTmpl = props.withReports ? (
        ReportWindow({ reports: props.reports, reportedUserID: props.userData.id, visible: props.reported })
    ) : (
        <div></div>
    );
    if (props.chats) {
        return (
            <div class='card-expended card-expended-chats-wide'>
                {reportWindowTmpl}
                <div class='card-expended__profile card-expended__profile-chats-wide'>
                    {imgTmpl}
                    <div class='card-expended__profilie-data'>
                        {descField}
                        {tagField}
                    </div>
                    {reportButtonTmpl}
                </div>
            </div>
        );
    }
    return (
        <div class='card-expended'>
            {reportWindowTmpl}
            <div class='card-expended__profile'>
                {imgTmpl}
                <div class='card-expended__profilie-data'>
                    {descField}
                    {tagField}
                </div>
                {reportButtonTmpl}
            </div>
        </div>
    );
};
