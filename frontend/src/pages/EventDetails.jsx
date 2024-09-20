import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi"; // Icons for date, location, time
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
      setRsvpStatus("Event Enrolled Successfully...!"); // Show success message
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
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Event Image */}
        {event.imageUrl && (
          <div className="lg:w-1/2">
            <img
              src={`https://swiftrut-task-4.vercel.app/${event.imageUrl}`}
              alt={event.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Event Info */}
        <div className="lg:w-1/2">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 text-gray-500">
              <HiOutlineCalendar className="w-6 h-6 text-gray-700" />
              <span>{formattedDate}</span>
              <HiOutlineClock className="w-6 h-6 text-gray-700" />
              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-center text-gray-500 gap-4">
              <HiOutlineLocationMarker className="w-6 h-6 text-gray-700" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              About this event
            </h3>
            <p className="text-gray-600">{event.description}</p>
          </div>

          {/* RSVP Button */}
          <div>
            {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
              <button
                className="border border-gray-400 text-orange-500 font-bold px-6 py-3 rounded-md hover:bg-orange-500 hover:text-white  w-full lg:w-auto"
                onClick={handleRSVP}
              >
                Reserve a spot
              </button>
            ) : (
              <p className="text-gray-500">
                {userHasRSVPd
                  ? "You have already booked this event."
                  : "This event is fully booked."}
              </p>
            )}

            {/* Show RSVP status message */}
            {rsvpStatus && <p className="text-green-500 mt-4">{rsvpStatus}</p>}
          </div>
        </div>
      </div>

      {/* Event Meta Info */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Event Details
        </h3>
        <div className="flex items-center gap-4 text-gray-600">
          <HiOutlineClock className="w-6 h-6 text-gray-700" />
          <p>
            {formattedTime} | {event.maxAttendees} total seats
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
