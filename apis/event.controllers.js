const { findById } = require("../database/model/Event");
const Event = require("../database/model/Event");

exports.fetchEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.log("i am error", error);
  }
};

exports.fetchEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event deosn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(501).json(error);
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const foundEvent = await Event.findById(req.params.eventId);
    if (foundEvent) {
      await Event.findByIdAndUpdate(req.params.eventId, req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Event deosn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const foundEvent = await Event.findById(req.params.eventId);
    if (foundEvent) {
      await Event.remove(foundEvent);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Event deosn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.fetchBooked = async (req, res) => {
//   try {
//     const events = await Event.find().where("bookedSeats").equals("numOfSeats");
//     if (events) {
//       res.status(200).json(events);
//     } else {
//       res.status(404).json({ message: "Event deosn't exist!" });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

exports.fetchAdvance = async (req, res) => {
  try {
    const events = await Event.find(
      {},
      {
        __id: true,
        name: true,
        image: true,
        startDate: true,
        // numOfSeats: true,
      },
      { sort: { startDate: "asc", name: "asc" } }
    );
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.fetchFullBooked = async (req, res) => {
  try {
    const events = await Event.find({
      $expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.fetchSearch = async (req, res) => {
  try {
    const events = await Event.find({
      name: { $regex: req.params.query, $options: "i" },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.eventPaginatedFetch = async (req, res) => {
//   try {
//     //   Inside req.body => { skip: 2, limit: 2 }
//     const events = await Event.find({}, null, req.body);
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
