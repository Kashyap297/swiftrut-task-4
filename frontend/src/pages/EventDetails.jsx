import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Ensure api is configured correctly

const EventDetails = () => {
  const { id } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null); // Track RSVP status
  const [userHasRSVPd, setUserHasRSVPd] = useState(false); // Track if the user has already RSVPed

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setUserHasRSVPd(response.data.attendees.includes("your_user_id")); // Check if the user has already RSVPed
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // RSVP to the event
  const handleRSVP = async () => {
    try {
      const response = await api.post(`/events/${id}/rsvp`);
      setEvent(response.data.event); // Update the event with the new RSVP
      setUserHasRSVPd(true); // Mark that the user has RSVPed
      setRsvpStatus("RSVP successful!"); // Show success message
    } catch (error) {
      console.error("RSVP failed:", error.response?.data || error.message);
      setRsvpStatus(
        error.response?.data?.message || "Error RSVPing to the event."
      );
    }
  };

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

      {/* RSVP button */}
      {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleRSVP}
        >
          RSVP
        </button>
      ) : (
        <p className="text-gray-500">
          {userHasRSVPd
            ? "You have already RSVPed for this event."
            : "This event is fully booked."}
        </p>
      )}

      {/* Show RSVP status message */}
      {rsvpStatus && <p className="text-green-500 mt-4">{rsvpStatus}</p>}
    </div>
  );
};

export default EventDetails;
