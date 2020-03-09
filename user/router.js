const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");

const router = new Router();

async function signUp(request, response, next) {
  try {
    if (
      !request.body.email ||
      !request.body.password ||
      !request.body.username
    ) {
      response.status(400).send("Please enter a valid e-mail and password");
    } else {
      const user = {
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        username: request.body.username
      };
      const createUser = await User.create(user);
      const username = createUser.username;
      response.json(username);
    }
  } catch (error) {
    next(error);
  }
}

router.post("/signup", signUp);

module.exports = router;
