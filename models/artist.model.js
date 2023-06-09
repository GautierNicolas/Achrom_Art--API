const Sequelize = require('sequelize');

// const { v4: uuidv4 } = require('uuid');
const artistRoles = ['artist', 'admin', 'superadmin']

module.exports = (sequelize, DataTypes) =>
  sequelize.define('artists', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      artist_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom d'artiste est déjà utilisé",
        },
        validate: {
          notEmpty: {
            msg: "Veuillez renseigner un nom d'artiste",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          msg: 'Cet email est déjà utilisé',
        },
        validate: {
          notEmpty: {
            msg: 'Veuillez renseigner un email',
          },
          isEmail: true          
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Veuillez renseigner un mot de passe',
          },
        },
      },
      roles: {
        type: DataTypes.STRING,
        defaultValue: 'artist',
        set(roles) {
          this.setDataValue('roles', roles.join())
        },
        get() {
          return this.getDataValue('roles').split(',')
        },
        validate: {
          areRolesValid(roles) {
            if (!roles) {
              throw new Error('Un utilisateur doit avoir au moins un rôle')
            }
            roles.split(',').forEach((role) => {
              if (!artistRoles.includes(role)) {
                throw new Error(
                  `Les rôles d'un utilisateur doivent appartenir à la liste suivante : ${artistRoles}`
                )
              }
            })
          },
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      biography: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_profile: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      view_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        },
      },
    }
  )
