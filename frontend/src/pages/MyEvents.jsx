import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming your Axios instance is in utils/api.js

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
        <ul>
          {events.map((event) => (
            <li key={event._id} className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Location: {event.location}</p>
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mt-4"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
