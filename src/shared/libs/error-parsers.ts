import { numArray } from './helpers';

export const parseError = (error: any) => {
    try {
        const parser = loopErrorParsing(error);
        const chances = numArray(5);
        for (const chance of chances) {
            const error = parser.next();
            if (!error.value) {
                continue;
            }

            return error.value;
        }
    } catch (e) {
        return '';
    }
};

function* loopErrorParsing(error: any): any {
    yield tryForErrorText(error.toString(), typeof error.toString() === 'string');
    yield tryForErrorText(error, error?.statusText);
    yield tryForErrorText(error, error?.response?.error);
    yield tryForErrorText(error, error?.response?.errorMessage);
}

const tryForErrorText = (error: string, test: boolean): any => {
    return !!test ? error : false;
};
