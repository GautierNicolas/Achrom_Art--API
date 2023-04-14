module.exports = (sequelize, DataTypes) => 
    sequelize.define('countries', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ISO3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      continent_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
})
