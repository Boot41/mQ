import React, { useState, useEffect, useRef } from "react";
import { Timeline } from "primereact/timeline";

const events = [
  {
    status: "Requirement Analysis",
    date: "Phase 1",
    description: "Gather and analyze requirements.",
    icon: "pi pi-search",
    details:
      "In this phase, stakeholders are interviewed, and system requirements are documented.",
  },
  {
    status: "System Design",
    date: "Phase 2",
    description: "Design the system architecture and components.",
    icon: "pi pi-cog",
    details:
      "This phase involves creating system models, architecture designs, and selecting technologies.",
  },
  {
    status: "Implementation",
    date: "Phase 3",
    description: "Code the system and implement functionality.",
    icon: "pi pi-code",
    details:
      "Developers write code and implement features according to the design specifications.",
  },
  {
    status: "Testing",
    date: "Phase 4",
    description: "Test the system for bugs and issues.",
    icon: "pi pi-bug",
    details:
      "Testers verify that the system works as expected, and any issues are addressed.",
  },
  {
    status: "Deployment",
    date: "Phase 5",
    description: "Deploy the system to a production environment.",
    icon: "pi pi-upload",
    details:
      "The system is deployed to production, making it available for end-users.",
  },
  {
    status: "Maintenance",
    date: "Phase 6",
    description: "Maintain and update the system as needed.",
    icon: "pi pi-refresh",
    details:
      "Ongoing support and updates ensure the system continues to meet user needs.",
  },
];

const customizedMarker = (item) => (
  <span className="flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg">
    <i className={`${item.icon} text-white text-xl`} />
  </span>
);

export default function TimelineComp() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [progressPosition, setProgressPosition] = useState(0);
  const timelineWrapperRef = useRef(null);

  const handleEventClick = (item) => {
    setSelectedEvent(selectedEvent === item ? null : item);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (timelineWrapperRef.current) {
        const rect = timelineWrapperRef.current.getBoundingClientRect();
        const timelineHeight = rect.height;
        const scrollTop = window.scrollY + window.innerHeight;
        const progress = Math.min(
          Math.max((scrollTop - rect.top) / timelineHeight, 0),
          1
        );
        setProgressPosition(progress * 100); // Set progress as a percentage
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize progress on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const customizedContent = (item) => (
    <div
      onClick={() => handleEventClick(item)}
      className="ml-4 p-6 bg-white border-l-4 border-orange-500 shadow-lg rounded-lg cursor-pointer hover:bg-orange-50 transition duration-300"
    >
      <h3 className="text-xl font-bold text-orange-600">{item.status}</h3>
      <p className="mt-2 text-gray-700">{item.description}</p>
      <small className="text-gray-500">{item.date}</small>
      {selectedEvent === item && (
        <div className="mt-4 p-4 bg-gray-100 border-t border-gray-300 rounded">
          <p className="text-gray-800">{item.details}</p>
        </div>
      )}
    </div>
  );

  return (
    
    <div className="bg-gray-50 p-8 relative -mt-24">
      <div ref={timelineWrapperRef} className="relative">
        <Timeline
          value={events}
          align="alternate"
          className="w-full"
          marker={customizedMarker}
          content={customizedContent}
        />
        <div
          className="absolute top-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        ></div>
      </div>
    </div>
  );
}
