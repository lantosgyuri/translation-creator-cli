const inquirer = require('inquirer');

const firstQuestion = [{
    type: 'input',
    name: 'language',
    message: 'For which language do you make this translation? (This will be also the name of the file)',
    default: 'marklar'
},
];

const createNewTranslation = async () => {
    const answers = await inquirer.prompt(firstQuestion);
    console.log(answers);
};

module.exports = createNewTranslation;
