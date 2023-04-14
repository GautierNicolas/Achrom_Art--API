module.exports = (sequelize, DataTypes) =>
  sequelize.define('artists_artworks', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    artworkId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  })
