import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { IconButton } from './iconButton.js';

export const ProfileActions = (props) => {
    return <div class='profile-actions'>{Object.keys(props).map((item) => IconButton(props[item]))}</div>;
};
