export const objectToArray = (object: any) => {
    const arr = [];
    for (const prop in object) {
        console.log(prop, object[prop]);
        if (object.hasOwnProperty(prop)) {
            arr.push(object[prop]);
        }
    }

    return arr;
};
