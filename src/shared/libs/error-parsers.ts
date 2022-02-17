export const parseError = (error: any) => {
    try {
        const result = tryForErrorText(error.toString(), typeof error.toString() === 'string');
        if (result) {
            return result;
        }
        return error;
    } catch (e) {
        return '';
    }
};

const tryForErrorText = (error: string, test: boolean): any => {
    return !!test ? error : false;
};
