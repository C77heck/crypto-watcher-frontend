export const objectToArray = (object: any) => {
    const arr = [];
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            arr.push(object[prop]);
        }
    }

    return arr;
};

export const priceFormat = (amount: number, currency: string = 'hun') => {
    if (!!amount) {
        const price = Math.round(amount);

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
