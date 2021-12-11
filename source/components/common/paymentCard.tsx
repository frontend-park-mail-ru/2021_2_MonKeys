import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { ProfileData } from '../../store/profileStore.js';
import eventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface PaymentCardProps {
    period: number;
    price: number;
    class: string;
}

export const PaymentCard = (props: PaymentCardProps) => {
    let monthText: string;
    if (props.period === 1) {
        monthText = ' месяц';
    } else if (props.period === 2 || props.period === 3 || props.period === 4) {
        monthText = ' месяца';
    } else {
        monthText = ' месяцев';
    }
    const paymentClick = () => {
        eventBus.dispatch<number>(EVENTS.LIKES_CHOICE_PAYMENT, props.price);
    };
    return (
        <div class={props.class} onclick={paymentClick} name={props.price}>
            <div class='payment-card__period'>{props.period + monthText}</div>
            <div class='payment-card__price'>{props.price + ' рублей'}</div>
        </div>
    );
};
