const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        bg_header: DataTypes.STRING,
        title: DataTypes.STRING,
        sinopse: DataTypes.STRING,
        content: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "post_owner",
    });
  }
}

module.exports = Post;
