import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';

import { Button } from '../common/button.js';
import { ReportRadioButton } from './reportRadioButton.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface reportWindowProps {
    reports: string[];
    reportedUserID: number;
    visible: boolean;
}

export const ReportWindow = (props: reportWindowProps) => {
    const reportedWindowModificator = !props.visible ? ' report-window_hidden' : '';
    const backButtonAction = () => {
        eventBus.dispatch(EVENTS.REPORTS_BACK_BUTTON);
    };
    const submitButtonAction = () => {
        eventBus.dispatch(EVENTS.REPORTS_DECLARE_BUTTON, props.reportedUserID);
    };

    return (
        <div class={'report-window' + reportedWindowModificator}>
            <form class='report-window__problems-buttons'>
                {Object.keys(props.reports).map((item) => ReportRadioButton({ report: props.reports[item] }))}
                {Button({
                    type: 'button',
                    text: 'Заявить',
                    class: 'button-white-big',
                    onclick: submitButtonAction,
                })}
                {Button({
                    type: 'button',
                    text: 'Отмена',
                    class: 'button-black-big',
                    onclick: backButtonAction,
                })}
            </form>
        </div>
    );
};
