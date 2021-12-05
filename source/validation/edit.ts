import { maxYear, minYear } from '../constants/validation.js';

const imgTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validImgType = (Img) => {
    if (Img && Img.type) {
        return imgTypes.includes(Img.type);
    } else {
        return false;
    }
};

export const validDate = (dateInput) => {
    const dateStr = dateInput.value.toString() + 'T00:00:00.730Z';
    const date = new Date(dateStr);

    const year = date.getFullYear();
    return minYear < year && year < maxYear;
};
