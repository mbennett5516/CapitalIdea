const db = require('../models');

module.exports = function (app) {

    app.get('/api/account', function (req, res) {
        db.Transactions.findAll({})
            .then(function (rows) {
                res.json(rows);
            }).catch(function (err) {
                res.json({error: err});
            });
    });

    app.get('/api/budgets', function (req, res) {
        db.Categories.findAll({})
            .then(function (rows) {
                res.json(rows);
            }).catch(function (err) {
                res.json({error: err});
            });
    });

    app.post('/api/transaction', function(req, res){
        console.log(req.body);
        db.Transactions.create(req.body).then(function(response){
            res.json({success: true});
        }).catch(function(err){
            res.json({error: err})
        });
    });

    app.get('/api/category/:id', function (req, res) {
        db.Categories.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (rows) {
            res.json(rows);
        }).catch(function (err) {
            res.json({error: err});
        });
    });

    app.put('/api/category/:id', function (req, res){
        db.Categories.update(req.body, {
            where:{
                id: req.params.id
            }
        }).then(function(response){
            res.json({success: true});
        }).catch(function(error){
            res.json({error: error});
        });
    });

    app.get('/api/transaction/:id', function(req, res){
        db.Transactions.findAll({
            where:{
                id: req.params.id
            }
        }).then(function(row){
            res.json(row);
        }).catch(function(error){
            res.json({error: error});
        });
    });

    app.delete('/api/transaction/:id', function(req, res){
        db.Transactions.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(response){
            res.json({success: true});
        }).catch(function(error){
            res.json({error: error});
        });
    });
}