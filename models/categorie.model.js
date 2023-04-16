module.exports = (sequelize, DataTypes) =>
  sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dessin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    peinture: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    photographie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    street_art: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    video: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  })
