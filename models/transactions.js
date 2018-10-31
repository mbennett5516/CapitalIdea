module.exports = function(sequelize, DataTypes){
    const Transactions = sequelize.define('Transactions', {
        transaction_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
        account_balance: {
            type: DataTypes.DOUBLE(10,2),
        }
    });

    Transactions.associate = function(models) {
        Transactions.belongsTo(models.Categories, {
          foreignKey: {
            allowNull: false
          }
        }); 
      }

    return Transactions
};