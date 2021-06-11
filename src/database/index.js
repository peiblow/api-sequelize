const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const UserModel = require("../models/UserModel");
const AddressModel = require("../models/AddressModel");
const PostModel = require("../models/PostModel");

const connection = new Sequelize(dbConfig);

UserModel.init(connection);
AddressModel.init(connection);
PostModel.init(connection);

UserModel.associate(connection.models);
AddressModel.associate(connection.models);
PostModel.associate(connection.models);

module.exports = connection;
