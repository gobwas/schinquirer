var schinquirer = require("./index");

schinquirer.prompt(
    {
        name: {
            type: "string",
            pattern: "\\d-\\d"
        },
        car: {
            type: "string",
            enum: ["audi", "bmw", "mercedes", "volkswagen"],
            message: "Which car?",
            default: "mercedes"
        }
    
    },
    function(err, answers) {
        console.log(answers.name, "drives", answers.car);
    }
);