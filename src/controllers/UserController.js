const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth_config');

class UserController {
  async auth(req, res) {
    const { name, password } = req.body;

    const user = await UserModel.findOne({ where: { name } })

    if(!user)
      return res.status('404').json({ error: 'Usuário não encontrado' });
    
    if(!await bcrypt.compare(password, user.password))
      return res.status('404').json({ error: 'Senha Inválida' });
    
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: '7d',
    });

    return res.status('200').json({ user, token });
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    if (await UserModel.findOne({ where: { email }}) || await UserModel.findOne({ where: { name }}))
      res.status(400).json({ error: 'Usario já existente' })

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.status(200).json({ user, token });
  }
}

module.exports = new UserController();
