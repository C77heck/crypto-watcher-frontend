export const onlyStringsValidator = (value: any) => {
    if (!value) {
        return true;
    }

    const hasOnlyStrings = /\D/;
    
    return hasOnlyStrings.test(value);
};
