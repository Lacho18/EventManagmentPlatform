import { useSelector } from "react-redux";
import EventHomepage from "../eventsComponents/EventHomepage";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function EventsView() {
  const color = useSelector((state) => state.themeColor.color);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      const response = await useFetch("events", "GET");

      if (response.status === 200) {
        setEventsData(response.data.events);
        setLoading(false);
      }
    }

    fetchEventData();
  }, []);

  return (
    <div
      className="bg-gray-400  overflow-scroll h-full w-10/12 absolute right-full"
      style={{
        backgroundColor: color.hardColor,
        transform: "translateX(120%)",
      }}
    >
      {loading ? (
        <div>Loading.....</div>
      ) : (
        eventsData.map((event) => (
          <EventHomepage key={event.id} event={event} />
        ))
      )}
    </div>
  );
}
