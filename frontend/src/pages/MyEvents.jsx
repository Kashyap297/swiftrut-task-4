import React from "react";

const MyEvents = () => {
  // In a real-world app, fetch the user's events from the backend
  const events = [
    { id: 1, title: "Event 1", date: "2024-09-30" },
    { id: 2, title: "Event 2", date: "2024-10-15" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">My Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
