const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createEvent,
  getAllEvents,
  getMyEvents,
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Updated to point to src/uploads
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

router.post("/create", protect, upload.single("image"), createEvent); // Upload single image file

// Get all events (publicly accessible)
router.get("/all", getAllEvents);

// Get events created by the logged-in user
router.get("/my-events", protect, getMyEvents);

module.exports = router;
