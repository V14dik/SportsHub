const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    point: {
      type: [Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
