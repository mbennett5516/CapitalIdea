module.exports = function(sequelize, DataTypes){
    const Categories = sequelize.define('Categories', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_required: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        category_budget: {
            type: DataTypes.DOUBLE(10,2),
            defaultValue: 20.00
        },
        category_total: {
            type: DataTypes.DOUBLE(10,2),
            defaultValue: 0.00
        }
    });

    Categories.associate = function(models) {
        Categories.hasMany(models.Transactions, {
            onDelete: 'cascade'
        });
    };

    return Categories;
}