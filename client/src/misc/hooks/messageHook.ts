export const useMessage = () => {
    const showMessage = (text: string) => {
        M.toast({ html: text, classes: 'blue lighten-4 black-text' });
    }

    return showMessage;
};