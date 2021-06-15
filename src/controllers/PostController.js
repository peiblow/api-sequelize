const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const getUserIdByToken = require("../services/getUserBytoken")

class PostController {
  async index(req, res) {
    const posts = await PostModel.findAll();

    return res.status(200).json(posts);
  }

  async myPosts(req, res) {
    const token = req.headers.authorization;
    const user_id = getUserIdByToken(token);

    const post = await PostModel.findByPk(user_id, {
      include: {
        association: "post_owner",
      },
    });

    return res.status(200).json(post);
  }

  async store(req, res) {
    const token = req.headers.authorization;
    const user_id = getUserIdByToken(token);

    const { title, sinopse, content } = req.body;

    const user = await UserModel.findByPk(user_id);

    if (!user)
      return res
        .status(400)
        .json({ error: "Não encontramos um usuario com este ID" });

    const post = await PostModel.create({
      title,
      sinopse,
      content,
      user_id,
    });

    res.status(200).json(post);
  }

  async remove(req, res) {
    const { post_id } = req.params;

    const post = PostModel.destroy({ where: { id: post_id } });

    res.status(200).json(post);
  }
}

module.exports = new PostController();
