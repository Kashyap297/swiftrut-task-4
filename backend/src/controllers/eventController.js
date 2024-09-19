const Event = require("../models/eventModel");
const path = require("path");

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  // Validate input
  if (!title || !description || !date || !location || !maxAttendees) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // Handle image file upload
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Create a new event
    const event = await Event.create({
      title,
      description,
      date,
      location,
      maxAttendees,
      imageUrl, // Image file URL
      createdBy: req.user._id, // req.user._id is from the logged-in user
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating the event",
      error: error.message,
    });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching events",
      error: error.message,
    });
  }
};

// Get events by the logged-in user
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching your events",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getMyEvents,
};
