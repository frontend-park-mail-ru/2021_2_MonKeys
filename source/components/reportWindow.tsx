import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import eventBus from '../dispatcher/eventBus.js';
import { TagButton } from './tagButton.js';
import reactions from '../constants/reactions.js';
import { Tag } from './tag.js';
import { IconButton } from './iconButton.js';
import { ImgCarousel } from './imgCarousel.js';
import { ProfileData } from '../store/profileStore.js';
import { CardActions } from './cardActions.js';
import { ImgCard } from './imgCard.js';
import { Button } from './button.js';
import { ReportRadioButton } from './reportRadioButton.js';

export interface reportWindowProps {
    reports: string[];
    reportedUserID: number;
    visible: boolean;
}

export const ReportWindow = (props: reportWindowProps) => {
    const reportedWindowModificator = !props.visible ? ' report-window_hidden' : '';
    const backButtonAction = () => {
        eventBus.dispatch('reports:back-button');
    };
    const submitButtonAction = () => {
        eventBus.dispatch('reports:declare-button', props.reportedUserID);
    };

    return (
        <div class={'report-window' + reportedWindowModificator}>
            <img src='icons/back.svg' class='report-window__button-back' onclick={backButtonAction} />
            <form class='report-window__problems-buttons'>
                {Object.keys(props.reports).map((item) => ReportRadioButton({ report: props.reports[item] }))}
                {Button({
                    type: 'button',
                    text: 'Заявить',
                    class: 'button-white-big',
                    onclick: submitButtonAction,
                })}
            </form>
        </div>
    );
};
