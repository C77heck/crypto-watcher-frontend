import { ValidatorInterface } from './validator-interface';

export const emailValidator = (value: any): ValidatorInterface => {
    if (!value) {
        return { hasError: true, errorMessage: '' };
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return { hasError: !emailRegex.test(value), errorMessage: '' };
};
