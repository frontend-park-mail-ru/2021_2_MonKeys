const imgTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validImgType = (Img) => {
    return imgTypes.includes(Img.type);
};
