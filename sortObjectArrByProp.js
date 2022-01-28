function sortObjectArrByProp(objArr, prop, reverse='s') {
    let sortedObjectArray = [];
    let values = [];
    let indices = [];

    objArr.map((obj, index) => {
        values.push(obj[prop]);
        indices.push(index);
    });

    for (let i = 1; i < values.length; i++) {
        for (let j = 0; j < values.length - i; j++) {
            if (values[j] > values[j + 1]) {
                [values[j], values[j + 1]] = [values[j + 1], values[j]];
                [indices[j], indices[j + 1]] = [indices[j + 1], indices[j]];
            }
        }
    }

    for (let k of indices) {
        sortedObjectArray.push(objArr[k]);
    }

    reverse === 'r'.toLowerCase() && sortedObjectArray.reverse();

    return sortedObjectArray;
}

export default sortObjectArrByProp;