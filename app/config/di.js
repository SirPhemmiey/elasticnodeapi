'use strict';

const serviceLocator    = require('app/lib/service_locator');
let config     = require('app/config/config');
let ElasticSearch = require('elasticsearch');

const TransactionController = require('app/controllers/transaction');
const TransactionService      = require('app/services/transaction');

/**
 * Returns a configured instance of elastic search client.
 */
serviceLocator.register('esClient', () => {

    let client = new ElasticSearch.Client({
        host: config.elasticSearch
    });

    return client;
});

/**
 * Returns an instance of the logger.
 */
serviceLocator.register('logger', () => {
    return require('app/lib/logger').create(config.application_logging);
});

/**
 * Registers the transaction service
 */
serviceLocator.register('transactionService', (serviceLocator) => {
    let logger = serviceLocator.get('logger');
    let esClient = serviceLocator.get('esClient');
    return new TransactionService(logger, esClient);
});

/**
 * Returns an instance of transaction controller
 */
serviceLocator.register('transactionController', (serviceLocator) => {
    let logger = serviceLocator.get('logger');
    let transactionService = serviceLocator.get('transactionService');

    return new TransactionController(logger, transactionService);
});

module.exports = serviceLocator;
