const makeArrayFromText = text => text.split('\n');
const deleteLastElement = arr => arr.splice(0,arr.length-1);
const createObjectFromArrays = (keys, values) => keys.reduce((object, key, index) => ({...object, [key]: values[index]}), {});
const changeTranslations = (oldTranslationObject, newTranslationObject) => ({...oldTranslationObject, ...newTranslationObject});
const sortObjectByKeys = object => Object.keys(object)
    .sort()
    .reduce((acc, key) => ({
        ...acc, [key]: object[key]
    }), {});

const getChangeTranslationFunction = keysToBeChanged => {
    const keys = deleteLastElement(makeArrayFromText(keysToBeChanged));

    return (newTranslationText, oldTranslationJson = {}) => {
        const newValues = deleteLastElement(makeArrayFromText(newTranslationText));
        const newTranslationsObject = createObjectFromArrays(keys, newValues);
        const oldTranslationObject = JSON.parse(JSON.stringify(oldTranslationJson));
        const sortedNewTranslation = sortObjectByKeys(changeTranslations(oldTranslationObject, newTranslationsObject));
        return JSON.stringify(sortedNewTranslation, null, 2);
    }
};

module.exports = getChangeTranslationFunction;
