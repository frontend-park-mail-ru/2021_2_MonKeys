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
import { Reports } from '../store/reportsStore.js';

export interface reportRadioButtonProps {
    report: Reports;
}

export const ReportRadioButton = (props: reportRadioButtonProps) => {
    const radioButtonAction = () => {
        eventBus.dispatch('reports:choose-report-type', props.report.reportDesc);
    };
    const classModificator = props.report.isActive ? ' report-radio-button_on' : '';

    return (
        <div
            name={props.report.reportDesc + '-button'}
            class={'report-radio-button' + classModificator}
            onclick={radioButtonAction}
        >
            <input name={props.report.reportDesc + '-radio'} type='radio' class='report-radio-button__input' />
            <label for={props.report.reportDesc} class='report-radio-button__label'>
                {props.report.reportDesc}
            </label>
        </div>
    );
};
