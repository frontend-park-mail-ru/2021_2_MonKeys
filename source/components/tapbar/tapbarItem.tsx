import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface tapbarItemProps {
  route: string
  src: string
}

export const TapbarItem = (props: tapbarItemProps) => {
  return (
    <mon-router route={props.route}>
      <img src={props.src} class='tapbar_item'  alt=''/>
    </mon-router>
  );
};
