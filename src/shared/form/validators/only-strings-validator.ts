import { ValidatorInterface } from './validator-interface';

export const onlyStringsValidator = (value: any): ValidatorInterface => {
    if (!value) {
        return { hasError: true, errorMessage: '' };
    }

    const hasOnlyStrings = /\D/;

    return { hasError: !hasOnlyStrings.test(value), errorMessage: '' };
};
