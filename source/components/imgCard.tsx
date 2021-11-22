import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { CardActions } from './cardActions.js';
import { ProfileData } from '../store/profileStore.js';
import { ImgCarousel } from './imgCarousel.js';

export interface ProfileCardProps {
    userData: ProfileData;

    size: string;
    expanded: boolean;
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

    return (
        <div class={'img-card img-card' + sizeModificator}>
            {/* {ImgCarousel(props.userData.imgs, true)} */}
            <img class={'img-card__img img-card__img' + sizeModificator} src={props.userData.imgs[0]} />
            <div class={'img-card__bottom-panel img-card__bottom-panel' + sizeModificator}>
                <div class={'img-card__short-desc img-card__short-desc' + sizeModificator}>
                    <div class={'img-card__name-age img-card__name-age' + sizeModificator}>{nameAge}</div>
                    <div class={'img-card__report-status'}>
                        <span class={'img-card__report-text'}>{props.userData.reportStatus}</span>
                    </div>
                </div>
                {CardActions({ userID: props.userData.id, expend: props.expanded })}
            </div>
        </div>
    );
};
