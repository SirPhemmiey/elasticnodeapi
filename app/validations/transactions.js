'use strict';

let joi = require('joi');

module.exports = {
    amount: joi.number().required(),
    date: joi.string().required(),
    customer_name: joi.string().required()
};
