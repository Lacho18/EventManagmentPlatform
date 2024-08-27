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
      console.log(response.data.events);

      if (response.status === 200) {
        setEventsData(response.data.events);
        setLoading(false);
        console.log(eventsData);
      }
    }

    fetchEventData();
  }, []);

  const eventExample = {
    id: 0,
    name: "Concert of Azis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit eos cupiditate officiis accusantium saepe aliquam, nam commodi in odio nisi, quasi ab illum distinctio repudiandae sed. Quos eaque excepturi earum!",
    location: "Bulgaria Sofia zalaArenaArmeec",
    duration: "4 h",
    places: 300,
    price: 30,
    organizer_ID: 1,
    eventDate: new Date(),
    image:
      "https://yt3.googleusercontent.com/VI7zIYF9bQzEoTzNM49vxYnO3Zi7yDNQlyvZ6_3IJexrqqY46AWx2nowybvwUSyA9tFYrGK5tQ=s900-c-k-c0x00ffffff-no-rj",
  };

  //ml-60

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
