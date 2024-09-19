import React from "react";

const EventCard = ({ title, date, location }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md">
        View Event
      </button>
    </div>
  );
};

export default EventCard;
