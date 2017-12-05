'use strict';

let httpStatus = require('http-status');

/**
 * Controller responsible for holding and scrutinizing transactions
 *
 * @class
 */
class TransactionController {

    /**
     * Constructs a new Transaction Controller.
     *
     * @constructor
     * @param {TransactionService} transactionService An instance of transaction service
     * @param {Logger} logger An instance of the logger
     */
    constructor(logger, transactionService) {
        this.transactionService  = transactionService;
        this.logger = logger;
    }

    /**
     * Endpoint POST /transaction
     *
     * @param {object} req Restify request object
     * @param {object} res Restify response object
     * @param {function} next Restify routing callback
     */
    add(req, res, next) {
        const body = req.body;

        this.transactionService.add(body)
            .then((data) => res.send(httpStatus.CREATED, data))
            .catch((error) => {
                res.send(httpStatus.InternalServerError, error);
            });
        next();
    }

    /**
     * Endpoint GET /transactions/:id
     * Retrieve a transaction
     * @param req
     * @param res
     * @param next
     */
    get(req, res, next) {
        this.transactionService.get(req.params.id)
            .then((data) => res.send(httpStatus.OK, data))
            .catch((error) => {
                res.send(httpStatus.InternalServerError, error);
            })
            .then(next);
    }

    /**
     * Endpoint PUT /transactions/:id
     * Update transaction
     * @param req
     * @param res
     * @param next
     */
    update(req, res, next) {

        this.transactionService.update(req.params.id, req.body)
            .then((data) => res.send(httpStatus.OK, data))
            .catch((error) => {
                res.send(httpStatus.InternalServerError, error);
            });
        next();
    }

    /**
     * Endpoint DELETE /transactions/:id
     * Delete a transaction
     * @param req
     * @param res
     * @param next
     */
    delete(req, res, next) {
        this.transactionService.delete(req.params.id)
            .then((data) => res.send(httpStatus.OK, data))
            .catch((error) => {
                res.send(httpStatus.InternalServerError, error);
            })
            .then(next);
    }
}

module.exports = TransactionController;
