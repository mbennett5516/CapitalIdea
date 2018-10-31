module.exports = function(sequelize, DataTypes){
    const Categories = sequelize.define('Categories', {
        category: {
            type: DataTypes.STRING
        }
    });

    Categories.associate = function(models) {
        Categories.hasMany(models.Transactions, {
            onDelete: 'cascade'
        });
    };

    return Categories;
}