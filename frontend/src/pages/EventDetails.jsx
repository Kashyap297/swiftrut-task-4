import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Ensure api is configured correctly

const EventDetails = () => {
  const { id } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!event) {
    return <p>No event details found.</p>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">{event.title}</h2>
      {event.imageUrl && (
        <img
          src={`http://localhost:8000${event.imageUrl}`}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <p className="text-gray-600">Date: {formattedDate}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-600">Description: {event.description}</p>
      <p className="text-gray-600">
        Attendees: {event.attendees.length}/{event.maxAttendees}
      </p>
    </div>
  );
};

export default EventDetails;
