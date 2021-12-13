import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
import { fourMonth, oneMonth, threeMonth, twoMonth } from '../../constants/subscriptionPeriod.js';

export interface PaymentCardProps {
    period: number;
    price: number;
    class: string;
}

export const PaymentCard = (props: PaymentCardProps) => {
    let monthText: string;
    if (props.period === oneMonth) {
        monthText = ' месяц';
    } else if (props.period === twoMonth || props.period === threeMonth || props.period === fourMonth) {
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
