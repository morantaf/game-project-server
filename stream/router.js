const stream = require("./index");
const { Router } = require("express");
const Rooms = require("../rooms/model");

const router = new Router();

router.get("/stream", async (request, response, next) => {
  try {
    stream.init(request, response);
    const allRooms = await Rooms.findAll();

    const roomAction = {
      type: "ALL_ROOMS",
      payload: allRooms
    };
    stream.send(roomAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
