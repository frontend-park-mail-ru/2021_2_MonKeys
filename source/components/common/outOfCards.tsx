import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export const OutOfCards = () => {
    return (
        <div>
            <img class='out-of-cards-drip-1' src='icons/drip_gradient.svg'></img>
            <img class='out-of-cards-drip-2' src='icons/drip_gradient.svg'></img>
            <img class='out-of-cards-drip-3' src='icons/drip_gradient.svg'></img>
            <h1 class='out-of-cards-sign'>Карточки кончились</h1>
        </div>
    );
};
