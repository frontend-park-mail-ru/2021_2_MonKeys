const imgTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

export const validImgType = (Img) => {
    return imgTypes.includes(Img.type);
};
