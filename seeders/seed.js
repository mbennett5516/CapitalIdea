const db = require('../models');

const items = [
    {
        //dummy data here
    }
];

const categories = [
    {
        //categories data here
    }
];

db.sequelize.sync({ force: true }).then(function () {
    db.Transactions.bulkCreate(items).then(function (rows) {
        console.log('\n\nINSERTED\n\n');
    }).catch(function (err) {
        console.log('\n\nError:', err);
    });

    db.Categories.bulkCreate(categories).then(function (rows) {
        console.log('\n\nINSERTED\n\n');
    }).catch(function (err) {
        console.log('\n\nError:', err);
    });
});