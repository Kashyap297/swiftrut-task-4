import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming your Axios instance is in utils/api.js

// Base URL for the backend (adjust if necessary)
const BASE_URL = "http://localhost:8000"; // Ensure this matches your backend's URL

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        // Use the Axios instance `api`
        const response = await api.get("/events/my-events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response?.data || error.message); // For debugging
        setError("Error fetching events");
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">My Events</h2>
      {events.length === 0 ? (
        <p>You have not created any events yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              {/* Display the image */}
              {event.imageUrl && (
                <img
                  src={`${BASE_URL}${event.imageUrl}`} // Full image URL
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              {/* Event Title */}
              <h2 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h2>

              {/* Event Date */}
              <p className="text-gray-600">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>

              {/* Event Location */}
              <p className="text-gray-600">Location: {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
