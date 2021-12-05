import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface tapbarItemProps {
    route: string;
    src: string;
    name?: string;
    action?: () => void;
}

export const TapbarItem = (props: tapbarItemProps) => {
    const icon = props.name ? (
        <div class='flex-center' onclick={props.action}>
            <img src={props.src} class='tapbar_item tapbar_item-small' alt='' />

            <div>{props.name}</div>
        </div>
    ) : (
        <img src={props.src} class='tapbar_item' alt='' />
    );

    return <mon-router route={props.route}>{icon}</mon-router>;
};
