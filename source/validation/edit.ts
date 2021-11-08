import { dateLength } from "../constants/validation";

const imgTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validImgType = (Img) => {
    return imgTypes.includes(Img.type);
};

export const validDate = (dateInput) => {
    const dateStr = dateInput.value.toString() + 'T00:00:00.730Z';
    const date = new Date(dateStr);

    const year = date.getFullYear();
    return 1950 < year && year < 2005;
};
