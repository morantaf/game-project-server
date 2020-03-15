const Sequelize = require("sequelize");
const db = require("../db");

const Rooms = db.define(
  "room",
  {
    name: {
      type: Sequelize.STRING
    },
    deckId: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    tableName: "rooms"
  }
);

module.exports = Rooms;
