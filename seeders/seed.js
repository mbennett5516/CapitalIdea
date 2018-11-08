const db = require('../models');

const items = [
    {
        transaction_type: 'Deposit',
        amount: 5000.00
    },
    {
        transaction_type: 'Debt',
        amount: 1432.33,
        category: 'Housing',
        CategoryId: 1
    },
    {
        transaction_type: 'Debt',
        amount: 127.12,
        category: 'Food',
        CategoryId: 2
    },
    {
        transaction_type: 'Debt',
        amount: 12.45,
        category: 'Food',
        CategoryId: 2
    },
    {
        transaction_type: 'Debt',
        amount: 232.14,
        category: 'Utilities',
        CategoryId: 3
    },
    {
        transaction_type: 'Debt',
        amount: 32.15,
        category: 'Transportation',
        CategoryId: 4
    },
    {
        transaction_type: 'Debt',
        amount: 1.00,
        category: 'Recreation',
        CategoryId: 7
    },
    {
        transaction_type: 'Deposit',
        amount: 5.00
    },
    {
        transaction_type: 'Debt',
        amount: 10.00,
        category: 'Health & Wellness',
        CategoryId: 5
    },
    {
        transaction_type: 'Debt',
        amount: 210.00,
        category: 'Insurance',
        CategoryId: 6
    },
    {
        transaction_type: 'Debt',
        amount: 20.00,
        category: 'Miscellaneous',
        CategoryId: 9
    },
    {
        transaction_type: 'Debt',
        amount: 20.00,
        category: 'Personal Spending',
        CategoryId: 8
    },
    {
        transaction_type: 'Debt',
        amount: 64.94,
        category: 'Recreation',
        CategoryId: 7
    }
];

const categories = [
    {
        category_name: 'Housing',
        category_budget: 1500.00,
        category_total: 1432.33
    },
    {
        category_name: 'Food',
        category_budget: 400.00,
        category_total: 139.57
    },
    {
        category_name: 'Utilities',
        category_budget: 350.00,
        category_total: 232.14
    },
    {
        category_name: 'Transportation',
        category_budget: 250.00,
        category_total: 32.15
    },
    {
        category_name: 'Health & Wellness',
        category_budget: 200.00,
        category_total: 10.00
    },
    {
        category_name: 'Insurance',
        category_budget: 500,
        category_total: 210.00
    },
    {
        category_name: 'Recreation',
        category_budget: 150.00,
        category_total: 65.94
    },
    {
        category_name: 'Personal Spending',
        category_budget: 150.00,
        category_total: 20.00
    },
    {
        category_name: 'Miscellaneous',
        category_budget: 150.00,
        category_total: 20.00
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