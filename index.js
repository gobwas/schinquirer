var inquirer  = require('inquirer'),
    validator = require("is-my-json-valid"),
    _         = require("lodash");

function prepare(schema, bread) {
    bread = bread || [];

    return _.reduce(schema, function (questions, schema, property) {
        if (schema.type == "object") {
            return questions.concat(hash(schema, bread.concat(property)));
        }

        questions.push({
            name: bread.concat(property).join("."),
            schema: schema
        });

        return questions;
    }, []);
}

exports.prompt = function(schema, callback) {
    var questions;

    questions = prepare(schema).reduce(function(questions, definition) {
        var choices, question, validate, when,
            name, schema;

        name = definition.name;
        schema = definition.schema;

        validate = validator(schema, {
            verbose: true
        });

        question = {
            name:    name,
            default: schema.default,
            message: schema.message || name,
            validate: function(value) {
                if (!validate(value)) {
                    return "Please insert correct value (" + _.first(validate.errors).message + ")";
                }

                return true;
            }
        };

        if (Array.isArray(choices = schema.enum)) {
            question.type = "list";
            question.choices = choices;
        } else if (schema.type == "boolean") {
            question.type = "confirm";
        } else {
            question.type = "input";
        }

        if (_.isObject(when = schema.when)) {
            question.when = function(answers) {
                return answers[when.key] == when.equal;
            };
        }

        if (schema.formatter == "number") {
            question.filter = function(value) {
                return parseInt(value);
            };
        }

        if (typeof schema.formatter == "function") {
            question.filter = schema.formatter;
        }

        questions.push(_.extend({}, schema, question));

        return questions;
    }, []);

    inquirer.prompt(questions, callback);
};