export const objectToArray = (object: any) => {
    const arr = [];
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            arr.push(object[prop]);
        }
    }

    return arr;
};

export const priceFormat = (amount: number, decimal = 1, currency: string = 'hun') => {
    if (!!amount) {
        const price = round(amount, decimal);

        return Intl
            .NumberFormat('hu-HU', {
                style: 'currency', currency: (currency || '')
                    .toUpperCase()
            })
            .format(price)
            .replace(/\D00(?=\D*$)/, '')
            .replace(/hun/i, 'Ft');
    }

    return '';
};

export const round = (num: number, decimal = 100) => {
    return Math.round(num * decimal) / decimal;
};

export const getClasses = (isTrue: boolean, classIfTrue: string, classIfFalse = '') => {
    return isTrue ? classIfTrue : classIfFalse;
};

export const numArray = (number: number, value: any = false) => {
    if (!value) {
        return Array.from({ length: number }, (i, index) => (index + 1));
    }
    return Array.from({ length: number }, (i, index) => value || index);
};

export const redirect = (location: string, inSite: boolean = true) => {
    if (inSite) {
        const baseUrl = window.location.origin;
        window.location.replace(`${baseUrl}${location}`);
    } else {
        window.location.replace(location);
    }
};
