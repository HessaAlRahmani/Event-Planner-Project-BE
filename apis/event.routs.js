const express = require("express");
const {
  fetchEvents,
  fetchEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchFullBooked,
  fetchSearch,
  fetchAdvance,
} = require("../apis/event.controllers");
const router = express.Router();

//fetch
router.get("/", fetchEvents);
//create
router.post("/", createEvent);
//update
router.put("/:eventId", updateEvent);
//delete
router.delete("/:eventId", deleteEvent);
//fetch only one
router.get("/:eventId", fetchEvent);
//filter fully booked
router.get("/full", fetchFullBooked);
//search by name
router.get("/search/:query", fetchSearch);
//advance fetch
router.get("/adv", fetchAdvance);

module.exports = router;
