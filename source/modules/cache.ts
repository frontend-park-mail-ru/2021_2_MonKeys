declare global {
    interface Window {
        imgCache: Array<HTMLImageElement>;
    }
}

const baseURL = 'http://localhost/';

export const preloadImage = (imgURL: string) => {
    const img = new Image();
    img.src = imgURL;
    window.imgCache.push(img);
};

export const cacheInit = () => {
    window.imgCache = [];
};

export const preloadImageList = (imgsURL: string[]) => {
    imgsURL.map((imgURL) => {
        preloadImage(imgURL);
    });
};

export const unloadImageList = (imgsURL: string[]) => {
    imgsURL = imgsURL.map((url) => {
        return baseURL + url;
    });
    window.imgCache = window.imgCache.filter((img) => {
        if (imgsURL.includes(img.src)) {
            img.src = '';
            img = null;
        } else {
            return img;
        }
    });
};
