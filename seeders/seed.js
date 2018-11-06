const db = require('../models');

const items = [
    {
        transaction_type: 'Deposit',
        amount: 5000.00
    },
    {
        transaction_type: 'Debt',
        amount: 20.00,
        category: 'Video Entertainment',
        CategoryId: 2
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
        category_total: 20.00
    },
    {
        category_name: 'Alcohol & Bars',
        category_budget: 10.00,
        category_total: 0.00
    },
    {
        category_name: 'Groceries',
        category_budget: 500.00,
        category_total: 0.00
    },
    {
        category_name: 'Restaurants',
        category_budget: 70.00,
        category_total: 0.00
    },
    {
        category_name: 'Clothing',
        category_budget: 30.00,
        category_total: 0.00
    },
    {
        category_name: 'Fast Food',
        category_budget: 30.00,
        category_total: 0.00
    },
    {
        category_name: 'Coffee Shops',
        category_budget: 20.00,
        category_total: 0.00
    }
];

db.sequelize.sync({force: true}).then(function () {
    db.Categories.bulkCreate(categories).then(function (rows) {
        console.log('\n\nINSERTED\n\n');
    }).catch(function (err) {
        console.log('\n\nError:', err);
    });
    db.Transactions.bulkCreate(items).then(function (rows) {
        console.log('\n\nINSERTED\n\n');
    }).catch(function (err) {
        console.log('\n\nError:', err);
    });
});