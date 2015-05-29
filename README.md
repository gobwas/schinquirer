# schinquirer

[![NPM version](https://badge.fury.io/js/schinquirer.svg)](http://badge.fury.io/js/schinquirer)

> [JSON-Schema](http://json-schema.org/) Prompt Inquirer

## What's up?

<img align="right" alt="JSON Schema Octopus" src="http://spacetelescope.github.io/understanding-json-schema/_images/octopus.png" title="JSON Schema"/>

Hey there! This is a simple json-schema inquirer ([json]<b>sch</b>[ema]<b>inquirer</b>), based on famous prompt [inquirer](https://github.com/SBoudrias/Inquirer.js) and [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid) validator.

## Getting started

```shell
npm install --save schinquirer
```

## Usage

```js
var schinquirer = require("schinquirer");

schinquirer.prompt(
    {
        properties: {
            name: {
                type: "string",
                pattern: "\d-\d"
            },
            car: {
                type: "string",
                enum: ["audi", "bmw", "mercedes", "volkswagen"],
                message: "Which car?",
                default: "mercedes"
            }
        }
    },
    function(answers) {
        console.log(answers.name, "drives", answers.car);
    }
);

```

## API

### schinquirer.prompt(schema: Object, callback: Function(answers: Object))

Asks questions by given schema, validates the answers and then invoke callback with them.

## Extensions to schema

You could use these fields additionally to your schema object:
 
 + message `string` - message (question) to show, if not present property name will printed;
 + default `*` - default value;
 + when `Object{key: string, equal: *}` - ask question, when some answer with `key` equal to `equal`;
 + format `string["number"]` - determine which formatter to apply for the input (available is: `number`).
