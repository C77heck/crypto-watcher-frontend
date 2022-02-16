export const parseError = (error: any): string => {
    if (typeof error === 'string') {
        return error;
    }

    try {
        return error?.statusText || JSON.stringify(error);
    } catch (e) {
        return '';
    }
};
