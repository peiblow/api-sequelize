const { Router } = require("express");

const authMiddleware = require("./middleware/auth_middleware");

const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const PostController = require("./controllers/PostController");

const routes = Router();

routes.post("/auth", UserController.auth);
routes.post("/register", UserController.store);

routes.get("/users/:user_id/addresses", authMiddleware, AddressController.index);
routes.post("/users/:user_id/addresses", authMiddleware, AddressController.store);

routes.get("/posts", authMiddleware, PostController.index)
routes.get("/myposts", authMiddleware, PostController.myPosts);
routes.post("/posts", authMiddleware, PostController.store);
routes.delete("/posts/:post_id", authMiddleware, PostController.remove);

module.exports = routes;
