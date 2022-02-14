import { ValidatorInterface } from './validator-interface';

export const requiredValidator = (value: any): ValidatorInterface => {
    return { hasError: !value, errorMessage: 'Required' };
};
