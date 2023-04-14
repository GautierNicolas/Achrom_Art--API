module.exports = (sequelize, DataTypes) =>
  sequelize.define('artworks_categories', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    artworkId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  })
