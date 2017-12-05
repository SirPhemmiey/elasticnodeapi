'use strict';

let shortid = require('shortid');
let constants = require('app/config/constants');

class TransactionService {

    /**
     * Account service constructor
     *
     * @constructor
     * @param {logger} logger instance of the logger
     */
    constructor(logger, esClient) {
        this.logger = logger;
        this.esClient = esClient;
    }

    /**
     * Add Transaction
     *
     * @param data
     * @returns {Promise.<TResult>}
     */
    add(data) {
        let reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Going to create transaction...`);

        return this.esClient.index({
                index: constants.esIndices.transaction,
                type: constants.esTypes.transaction,
                body: data
            })
            .then((result) => {
                // Save
                this.logger.info(`Request ID: ${reqId} - Transaction created :) : ${JSON.stringify(result)}`);
                return this.get(result._id);
            })
            .catch((error) => {
                //tell the developer what went wrong
                this.logger.error(`Request ID: ${reqId} - There was an error: ${JSON.stringify(error)}`);
                throw error;
            });
    }

    /**
     * Get a transaction
     * @param id
     * @returns {Promise.<TResult>}
     */
    get(id) {

        let reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Retrieve a transaction with id: ${id}`);

        return this.esClient.get({
                index: constants.esIndices.transaction,
                type: constants.esTypes.transaction,
                id: id
            })
            .then((transaction) => {
                this.logger.info(`Request ID: ${reqId} - Retrieved transaction `, JSON.stringify(transaction));
                return this.transformGottenData(transaction);
            }).catch((error) => {

                this.logger.error(
                    `Request ID: ${reqId} - Error retrieving transaction with id ${id}, reason: ${error.message}`);
                throw error;
            });
    }

    /**
     * Update a transaction
     *
     * @param id
     * @param data
     * @returns {Promise.<TResult>}
     */
    update(id, data) {

        let reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Updating transaction id: ${id}`);

        return this.esClient.update({
                index: constants.esIndices.transaction,
                type: constants.esTypes.transaction,
                id: id,
                body: {
                    doc: data
                }
            })
            .then(() => {
                this.logger.info(`Request ID: ${reqId} - Transaction updated`);
                return this.get(id);
            })
            .catch((error) => {
                this.logger.error(
                    `Request ID: ${reqId} - Error updating transaction id ${id}, reason: ${error.message}`);
                throw error;
            });
    }

    /**
     * Delete a transaction
     * @param id
     * @returns {Promise.<TResult>}
     */
    delete(id) {
        let reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Deleting transaction with id: ${id}`);

        return this.esClient.delete({
                index: constants.esIndices.transaction,
                type: constants.esTypes.transaction,
                id: id
            })
            .then(() => {
                this.logger.info(`Request ID: ${reqId} - Successfully deleted transaction with id: ${id}`);

                return true;
            })
            .catch((error) => {

                this.logger.info(`Request ID: ${reqId} - Failed to delete transaction
                with id: ${id} reason:`, error);

                throw error;
            });

    }

    transformGottenData(data) {
        let transformedData = {
            id: data._id,
            amount: data._source.amount,
            date: data._source.date,
            customer_name: data._source.customer_name
        };
        return transformedData;
    }

}

module.exports = TransactionService;
