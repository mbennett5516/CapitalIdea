const db = require('../models');

module.exports = function (app) {

    app.get('/api/account', function (req, res) {
        db.Transactions.findAll({})
            .then(function (row) {
                res.json(row);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/budgets', function (req, res) {
        db.Categories.findAll({})
            .then(function (rows) {
                res.json(rows);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/last_transaction', function (req, res) {
        db.Transactions.findAll({
            limit: 1,
            order: ['createdAt', 'DESC'],
        }).then(function (row) {
            res.json(row);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.get('/api/:categoryId', function (req, res) {
        db.Transactions.findAll({
            where: {
                CategoryId: req.params.categoryId
            }
        }).then(function (rows) {
            res.json(rows);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.get('/api/:transactionType', function (req, res) {
        db.Transactions.findAll({
            where: {
                transaction_type: req.params.transactionType
            }
        }).then(function (rows) {
            res.json(rows);
        }).catch(function (err) {
            res.json(err);
        })
    })

}