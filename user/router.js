const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");
const { toData } = require("../auth/jwt");

const router = new Router();

async function createUser(request, response, next) {
  try {
    if (!request.body.email || !request.body.password) {
      response.status(400).send("Please enter a valid e-mail and password");
    } else {
      const user = {
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10)
      };
      const createUser = await User.create(user);
      response.json(createUser);
    }
  } catch (error) {
    next(error);
  }
}

async function getUsers(request, response, next) {
  try {
    const fetchUser = await User.findAll();

    response.json(fetchUser);
  } catch (error) {
    next(error);
  }
}

async function getUniqueUser(request, response, next) {
  try {
    const fetchUniqueUser = await User.findByPk(request.params.id);

    response.json(fetchUniqueUser);
  } catch (error) {
    next(error);
  }
}

router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUniqueUser);

module.exports = router;
