const db = require('../models');

const items = [
    {
        //dummy data here
    }
];

const categories = [
    {
        category_name: 'Gas & Fuel',
        category_budget: 200.00,
        category_total: 0.00
    },
    {
        category_name: 'Video Entertainment',
        category_budget: 70.00,
        category_total: 0.00
    },
    {
        category_name: 'Alcohol & Bars',
        category_budget: 10.00,
        category_total: 0.00
    },
    {
        category_name: 'Coffee Shops',
        category_budget: 10.00,
        category_total: 0.00
    },
    {
        category_name: 'Gas & Fuel',
        category_budget: 200.00,
        category_total: 0.00
    },
    {
        category_name: 'Gas & Fuel',
        category_budget: 200.00,
        category_total: 0.00
    },
    {
        category_name: 'Gas & Fuel',
        category_budget: 200.00,
        category_total: 0.00
    },
    {
        category_name: 'Gas & Fuel',
        category_budget: 200.00,
        category_total: 0.00
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