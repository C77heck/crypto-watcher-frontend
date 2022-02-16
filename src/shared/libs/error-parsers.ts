export const parseError = (error: any): string => {
    try {
        tryForErrorText(error.toString(), typeof error.toString() === 'string');
    } catch (e) {
        return '';
    }
};

const tryForErrorText = (error: string, test: boolean) => {
  return test ? { error, type: 'succes' } : false
};
