/**
 @description Setup routes
 **/

'use strict';

/** Application Routes **/
module.exports.register = function(server, serviceLocator) {

    /**
     * POST(Create) transactions
     */
    server.post({
        path: '/transactions',
        name: 'add_transactions',
        version: '1.0.0',
        validation: {
            body: require('app/validations/transactions')
        }
    }, (req, res, next) => serviceLocator.get('transactionController').add(req, res, next));

    /**
     * GET(Read) transactions
     */
    server.get({
        path: '/transactions/:id',
        name: 'get_transaction',
        version: '1.0.0',
        validation: {
            params: require('app/validations/get_transaction')
        }
    }, (req, res, next) => serviceLocator.get('transactionController').get(req, res, next));

    /**
     * PUT(Update) transaction
     */
    server.put({
        path: '/transactions/:id',
        name: 'update_transaction',
        version: '1.0.0',
        validation: {
            body: require('app/validations/update_transaction').body,
            params: require('app/validations/update_transaction').params
        }
    }, (req, res, next) => serviceLocator.get('transactionController').update(req, res, next));

    /**
     * DELETE(Delete) transaction
     */
    server.del({
        path: '/transactions/:id',
        name: 'delete_transaction',
        version: '1.0.0',
        validation: {
            params: require('app/validations/delete_transaction')
        }
    }, (req, res, next) => serviceLocator.get('transactionController').delete(req, res, next));

};
