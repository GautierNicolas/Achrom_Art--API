module.exports = (sequelize, DataTypes) =>
  sequelize.define('artworks', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce titre est déjà utilisé',
      },
      validate: {
        notEmpty: {
          msg: 'Veuillez renseigner un titre',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Cette source est déjà utilisé',
      },
      validate: {
        notEmpty: {
          msg: 'Veuillez renseigner la source',
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  })
