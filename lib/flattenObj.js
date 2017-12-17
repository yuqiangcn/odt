const flattenObj = (obj, prefix) => {
    const _flattenedObj = {};
    const _obj = Object.assign({}, obj);
    for (const i in _obj) {
        if (Array.isArray(_obj[i])) {
            continue;
        }
        const suffKey = prefix ? `${prefix}_${i}` : i;
        Object.assign(_flattenedObj, typeof _obj[i] === "object" ? flattenObj(_obj[i], suffKey) : { [suffKey]: _obj[i] });

    }
    return _flattenedObj;
};
module.exports = flattenObj;