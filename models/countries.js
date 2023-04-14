module.exports = (sequelize, DataTypes) => 
  sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iso: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })
