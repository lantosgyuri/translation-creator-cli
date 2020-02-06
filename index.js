const inquirer = require('inquirer');

const questions = [{
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false
},{
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
    },
];

inquirer.prompt(questions).then(answers => console.log(answers));
