import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export const ImgField = () => {
    return (
        <div class='im-container'>
            <div style='position: relative;'>
                <img src='../img/Elon_Musk_2015.jpg' class='im' />
                <button type='button' class='removeImg'></button>
            </div>
            <div style='position: relative;'>
                <img src='../img/Elon_Musk_2015.jpg' class='im' />
                <button type='button' class='removeImg'></button>
            </div>
            <div style='position: relative;'>
                <img src='../img/Elon_Musk_2015.jpg' class='im' />
                <button type='button' class='removeImg'></button>
            </div>
        </div>
    );
};
