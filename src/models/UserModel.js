const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, {
      foreignKey: "user_id",
      as: "addresses_owner",
    });

    this.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "post_owner",
    });
  }
}

module.exports = User;
