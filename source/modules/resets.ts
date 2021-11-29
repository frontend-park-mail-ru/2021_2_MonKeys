export const resetDefaults = (root: HTMLElement) => {
    root.addEventListener('ondragstart', () => {
        console.log(1);
    });
};
