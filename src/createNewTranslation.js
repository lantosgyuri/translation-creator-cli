const inquirer = require('inquirer');
const getChangeTranslationFunction = require('./changeTranslation');
const fs = require('fs');
const path = require('path');

const KEY_DEFAULT = 'MARKLAR_MARKLAR';
const VALUE_DEFAULT = 'marklar marklar marklar';

const checkForeEmptyKey = (keys, defaultKey) => keys === defaultKey;
const getInputArrayLength = text => text.split('\n').length;

const arrayLengthChecker = (() => {
    let length = 0;

    return {
        setKeysArrayLength: keysLength => {length = keysLength },
        validateArrayLengthTheSame: valuesLength => length === valuesLength,
    }
})();

const firstQuestion = [
    {
    type: 'input',
    name: 'language',
    message: 'For which language do you make this translation? (This will be also the name of the file)',
    default: 'Marklar'
},
    {
        type: 'editor',
        name: 'keys',
        message: 'Please copy the all of the keys (if you are using VIM Quit with esc -> :wq!)',
        default: KEY_DEFAULT,
        validate: function(text) {
            if (checkForeEmptyKey(text, KEY_DEFAULT)) {
                return 'You have to provide at least one key';
            }
            const length = getInputArrayLength(text);
            arrayLengthChecker.setKeysArrayLength(length);
            console.log('\x1b[31m', `***You have provided ${length} keys***`);
            return true;
        }
    },
    {
        type: 'editor',
        name: 'values',
        message: 'Please copy the all of the values (if you are using VIM Quit with esc -> :wq!)',
        default: VALUE_DEFAULT,
        validate: function(text) {
            if (checkForeEmptyKey(text,VALUE_DEFAULT)) {
                return 'You have to provide at least one value';
            }
            const length = getInputArrayLength(text);
            console.log('\x1b[31m', `***You have provided ${length} values***`);
            if(!arrayLengthChecker.validateArrayLengthTheSame(length)){
                return 'You have not provided the same amount of values';
            }
            return true;
        }
    },
];

const createNewTranslation = async () => {
    const answers = await inquirer.prompt(firstQuestion);
    console.log('\x1b[32m', `Creating the Json File...`);
    const createTranslationFile = getChangeTranslationFunction(answers.keys);
    const translations = createTranslationFile(answers.values);
    //TODO ask user to provide a path
    try {
        fs.writeFileSync(path.resolve(__dirname, `${answers.language}.json`), translations);
    }catch (e) {
        console.log('\x1b[31m', `THERE WAS AN ERROR ${e}`);
        return;
    }
    console.log('\x1b[32m', `Your json file is ready to use. Have Fun!`);
};

module.exports = createNewTranslation;
