import React from "react";

const EventCard = ({ title, date, location }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">Date: {date}</p>
      <p className="text-gray-600">Location: {location}</p>
      <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-orange-600">
        View Event
      </button>
    </div>
  );
};

export default EventCard;
