import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { CardActions } from './cardActions.js';
import { ProfileData } from '../../store/profileStore.js';
import { ImgCarousel } from './imgCarousel.js';

export interface ProfileCardProps {
    userData: ProfileData;

    size: string;
    withActions: boolean;
    expanded: boolean;
    feed?: boolean;

    hidden?: boolean;
}

export const ImgCard = (props: ProfileCardProps) => {
    const nameAge = props.userData.name + ', ' + props.userData.age;
    let sizeModificator: string;
    switch (props.size) {
        case 'small':
            sizeModificator = '_size_small';
            break;
        case 'medium':
            sizeModificator = '_size_medium';
            break;
        case 'big':
            sizeModificator = '_size_big';
            break;
    }
    const ReportTmpl = props.userData.reportStatus ? (
        <div class={'img-card__report-status'}>
            <span class={'img-card__report-text'}>{props.userData.reportStatus}</span>
        </div>
    ) : (
        <div></div>
    );
    const cardActionsTmpl = props.withActions ? (
        CardActions({ userID: props.userData.id, expend: props.expanded, feed: props.feed })
    ) : (
        <div></div>
    );
    const blurTmpl = props.hidden ? <div class='img-card__blur'></div> : <div></div>;
    return (
        <div class={'img-card img-card' + sizeModificator}>
            {ImgCarousel(props.userData.imgs, 'img-card__img img-card__img' + sizeModificator)}
            <div class={'img-card__bottom-panel img-card__bottom-panel' + sizeModificator}>
                <div class={'img-card__short-desc img-card__short-desc' + sizeModificator}>
                    <div class={'img-card__name-age img-card__name-age' + sizeModificator}>{nameAge}</div>
                    {ReportTmpl}
                </div>
                {cardActionsTmpl}
            </div>
            {/* {blurTmpl} */}
        </div>
    );
};
