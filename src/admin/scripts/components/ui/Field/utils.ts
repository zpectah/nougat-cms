export const toggleArrayItem = (
    array: (string | number)[],
    payload: string | number,
) => {
    let item = payload;
    const arrayTmp = [ ...array ];
    const index = arrayTmp.indexOf(item);
    if (index > -1) {
        arrayTmp.splice(index, 1);
    } else {
        arrayTmp.push(item);
    }

    return arrayTmp;
};
