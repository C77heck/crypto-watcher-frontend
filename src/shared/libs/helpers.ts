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
    const val = !!amount ? amount : 0;
    const price = round(val, decimal);

    return Intl
        .NumberFormat('hu-HU', {
            style: 'currency', currency: (currency || '')
                .toUpperCase()
        })
        .format(price)
        .replace(/\D00(?=\D*$)/, '')
        .replace(/hun/i, 'Ft');
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

export const getUniqueId = () => {
    return (Math.random() * 1000).toString(16).replace('.', '');
};

export const unique = (items: any[], propBy = ''): any[] => {
    if (!propBy) {
        return Array.from(new Set(items));
    }

    const uniqueItems = [];
    const usedProps: any[] = [];
    for (const item of items) {
        if (!usedProps.includes(item[propBy])) {
            usedProps.push(item[propBy]);
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
};

export const sort = (collection: any[], direction: 'asc' | 'desc' = 'asc', by = ''): any[] => {
    if (!by) {
        return collection.sort((a, b) => a - b);
    }
    return collection.sort((a, b) => a[by].localeCompare(b[by]));
};
