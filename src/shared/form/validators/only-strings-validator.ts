export const onlyStringsValidator = (value: any) => {
    if (!value) {
        console.log({ value: !value });
        return true;
    }

    const hasOnlyStrings = /\D/;
    console.log({ value: hasOnlyStrings.test(value) });

    return hasOnlyStrings.test(value);
};
