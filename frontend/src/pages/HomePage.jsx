import React from "react";
import EventCard from "../components/EventCard";

const HomePage = () => {
  // Example data (you can later fetch this from API)
  const events = [
    { title: "React Conference", date: "2024-12-12", location: "New York" },
    { title: "JS Summit", date: "2024-11-20", location: "San Francisco" },
    // more events...
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
