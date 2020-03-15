const { Router } = require("express");
const Rooms = require("./model");
const stream = require("../stream");
const superagent = require("superagent");

const router = new Router();

async function createRoom(request, response, next) {
  try {
    const { name } = request.body;
    const fetchDeck = await superagent.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const Deck = fetchDeck.body;
    const createRoom = await Rooms.create({ name: name, deckId: Deck.deck_id });
    const roomId = createRoom.id;
    const action = {
      type: "NEW_ROOM",
      payload: createRoom
    };

    stream.send(action);

    response.send(`The room ${name ? name : roomId} has been created`);
  } catch (error) {
    next(error);
  }
}

async function getDeckRoom(request, response, next) {
  try {
    const room = await Rooms.findByPk(request.params.roomId);
    response.send(room);
  } catch (error) {
    next(error);
  }
}

router.post("/rooms", createRoom);
router.get("/rooms/:roomId", getDeckRoom);

module.exports = router;
