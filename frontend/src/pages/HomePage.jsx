import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import api from "../api/api"; // Assuming you have axios instance in api.js

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");
        setEvents(response.data); // Set the fetched events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
            />
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
