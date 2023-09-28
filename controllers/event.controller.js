const Event = require("../models/event.model");
const User = require("../models/user.model");

module.exports.createEvent = async function (req, res) {
  const event = req.body;
  try {
    const doc = new Event({
      name: event.name,
      description: event.description,
      dateTime: event.dateTime,
      point: event.point,
      user: req.userId,
      members: [],
    });
    doc.save();
    res.json(doc);
    return doc;
  } catch (e) {
    console.log(e);
  }
};

module.exports.getEvent = async function (req, res) {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId).catch(function (err) {
      res.sendStatus(404).json({ message: "Bad request" });
    });
    const user = await User.findById(event.user);
    res.json({ ...event._doc, username: user.username });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getEvents = async function (req, res) {
  try {
    const events = await Event.find();
    res.json(events);
    return events;
  } catch (e) {
    console.log(e);
  }
};

module.exports.joinEvent = async function (req, res) {
  try {
    await Event.findById(req.body.eventId)
      .where("members")
      .nin([req.userId])
      .updateOne({ $push: { members: req.userId } });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

module.exports.unjoin = async function (req, res) {
  try {
    await Event.findById(req.body.eventId).updateOne({
      $pull: { members: req.userId },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};
