import React from "react";

// Base URL for the backend
const BASE_URL = "http://localhost:8000"; // Ensure this matches your backend's URL

const EventCard = ({ title, date, location, imageUrl }) => {
  // Construct the full image URL
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  console.log(fullImageUrl);
  // Format the event date
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Display the image */}
      {imageUrl && (
        <img
          src={fullImageUrl} // Use the full image URL here
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* Event Title */}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      {/* Event Date */}
      <p className="text-gray-600">Date: {formattedDate}</p>

      {/* Event Location */}
      <p className="text-gray-600">Location: {location}</p>

      {/* View Event Button */}
      <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-orange-600">
        View Event
      </button>
    </div>
  );
};

export default EventCard;
