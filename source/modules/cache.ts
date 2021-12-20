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
        console.log(imgURL);
    });
};

export const unloadImageList = (imgsURL: string[]) => {
    imgsURL = imgsURL.map((url) => {
        return baseURL + url;
    });
    console.log(imgsURL);
    window.imgCache = window.imgCache.filter((img) => {
        console.log(img.src);
        if (imgsURL.includes(img.src)) {
            console.log(img.src);
            img.src = '';
            img = null;
        } else {
            return img;
        }
    });
    console.log(window.imgCache);
};
