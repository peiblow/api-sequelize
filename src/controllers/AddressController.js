const AddressModel = require("../models/AddressModel");
const UserModel = require("../models/UserModel");

class AddressController {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await UserModel.findByPk(user_id, {
      include: {
        association: "addresses_owner",
      },
    });

    return res.status(200).json(user);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await UserModel.findByPk(user_id);

    if (!user)
      return res
        .status(400)
        .json({ error: "Não encontramos um usuario com este ID" });

    const address = await AddressModel.create({
      zipcode,
      street,
      number,
      user_id,
    });

    res.status(200).json(address);
  }
}

module.exports = new AddressController();
