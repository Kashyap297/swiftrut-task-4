import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import api from "../api/api"; // Axios instance
import { format } from "date-fns";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locations, setLocations] = useState([]); // State for unique locations
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch all events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");
        const fetchedEvents = response.data;
        setEvents(fetchedEvents); // Set the fetched events in state
        setFilteredEvents(fetchedEvents); // Initially, no filters applied

        // Extract unique locations from the events
        const uniqueLocations = [
          ...new Set(fetchedEvents.map((event) => event.location)),
        ];
        setLocations(uniqueLocations); // Set the unique locations for the dropdown
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchEvents();
  }, []);

  // Function to handle filtering
  const handleFilter = () => {
    let filtered = events;

    // Filter by title
    if (selectedTitle) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(selectedTitle.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(
        (event) => format(new Date(event.date), "yyyy-MM-dd") === selectedDate
      );
    }

    setFilteredEvents(filtered);
  };

  // Function to clear filters and reset the event list
  const clearFilters = () => {
    setSelectedTitle(""); // Clear the title filter
    setSelectedLocation(""); // Clear the location filter
    setSelectedDate(""); // Clear the date filter
    setFilteredEvents(events); // Reset to all events
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>

      {/* Filter UI */}
      <div className="flex flex-wrap justify-between items-center mb-8 p-4 border rounded-lg shadow-sm bg-white">
        {/* Event Title Filter */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            placeholder="Search by event title"
            className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
          />
        </div>

        {/* Location Filter (Dynamic Dropdown) */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label
            htmlFor="location"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <label
            htmlFor="date"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto p-2 border rounded-md text-gray-700"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleFilter}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Search
        </button>

        {/* No Filter Button */}
        <button
          onClick={clearFilters}
          className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 ml-4"
        >
          No Filter
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
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
