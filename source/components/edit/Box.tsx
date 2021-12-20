import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Tag } from './tag.js';
import eventBus from '../../dispatcher/eventBus.js';

const BaseBox = ({ titleTmpl, titleClass = '', bodyTmpl, bodyClass = '' }) => {
    return (
        <div class='box'>
            <div class={'box__title ' + titleClass}>{titleTmpl}</div>
            <div class={'box__body ' + bodyClass}>{bodyTmpl}</div>
        </div>
    );
};

export const Box = ({ titleText, bodyItems, bodyClass = '' }) => {
    const itemsTmpl = [];
    bodyItems.forEach((item) => itemsTmpl.push(Tag(item)));

    return BaseBox({
        titleTmpl: <span class='box__title-text'>{titleText}</span>,
        bodyTmpl: itemsTmpl,
        bodyClass: bodyClass,
    });
};

export const OpeningBox = ({ titleText, isOpen, eventOpening, bodyItems, bodyClass = '' }) => {
    const src = isOpen ? 'icons/shrink.svg' : 'icons/expand_big.svg';
    const onclick = () => {
        eventBus.dispatch(eventOpening);
    };

    const titleTmpl = [];
    titleTmpl.push(<span class='box__title-text'>{titleText}</span>);
    titleTmpl.push(<img class='box__title-icon' src={src} onclick={onclick} />);

    const itemsTmpl = [];
    if (isOpen) {
        bodyItems.forEach((item) => itemsTmpl.push(Tag(item)));
    }

    return BaseBox({
        titleTmpl: titleTmpl,
        titleClass: '',
        bodyTmpl: itemsTmpl,
        bodyClass: isOpen ? bodyClass : '',
    });
};
