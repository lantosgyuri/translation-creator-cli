const inquirer = require('inquirer');
const createNewTranslation = require('./src/createNewTranslation');
const modifyTranslation = require('./src/modifyTranslation');

const CHOICE_NEW_FILE = 'Create new translation json';
const CHOICE_MODIFY = 'Modify the exiting ones';

const firstQuestion = [{
        type: 'rawlist',
        name: 'newFile',
        message: 'Do you want to create a new Translation file or modify your existing ones',
        choices: [CHOICE_NEW_FILE, CHOICE_MODIFY]
},
];

inquirer.prompt(firstQuestion).then(
    answers => {
        if(answers.newFile === CHOICE_NEW_FILE) {
            createNewTranslation();
        } else{
            modifyTranslation();
        }
    });

/*
* {
        type: 'rawlist',
            name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke']
},
    {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!'
    },
    {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
            {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese'
            },
            {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed'
            },
            {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian'
            }
        ]
    },*/
