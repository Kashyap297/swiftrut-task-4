import React from "react";
import { useNavigate } from "react-router-dom";

// Base URL for the backend
const BASE_URL = "http://localhost:8000"; // Ensure this matches your backend's URL

const EventCard = ({ id, title, date, location, imageUrl }) => {
  const navigate = useNavigate();
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const formattedDate = new Date(date).toLocaleDateString();

  const handleViewDetails = () => {
    console.log("ok");
    if (id) {
      navigate(`/event/${id}`); // Ensure id is not undefined here
    } else {
      console.error(
        "Event ID is undefined. Check if the ID is passed correctly."
      );
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {imageUrl && (
        <img
          src={fullImageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">Date: {formattedDate}</p>
      <p className="text-gray-600">Location: {location}</p>

      <button
        className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-orange-600"
        onClick={handleViewDetails}
      >
        View Event
      </button>
    </div>
  );
};

export default EventCard;
