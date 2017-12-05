'use strict';

let joi = require('joi');

module.exports = {
    params: {
        id: joi.string().required()
    },
    body: {
        amount: joi.number().optional(),
        date: joi.string().optional(),
        customer_name: joi.string().optional()
    }
};
