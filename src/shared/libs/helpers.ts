export const objectToArray = (object: any) => {
    const arr = [];
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            arr.push(object[prop]);
        }
    }

    return arr;
};
