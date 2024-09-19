const express = require("express");
const {
  createEvent,
  getAllEvents,
  getMyEvents,
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new event (only authenticated users)
router.post("/create", protect, createEvent);

// Get all events (publicly accessible)
router.get("/all", getAllEvents);

// Get events created by the logged-in user
router.get("/my-events", protect, getMyEvents);

module.exports = router;
