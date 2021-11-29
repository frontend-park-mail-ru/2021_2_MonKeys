import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';

export const ProfileActions = (props) => {
    return (
        <div class='view-content__profile-actions'>
            <div class='profile-actions'>{Object.keys(props).map((item) => IconButton(props[item]))}</div>
        </div>
    );
};