import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function EventPage() {
  const { id } = useParams();

  //gets the data for the selected event event
  useEffect(() => {
    async function getEventData() {
      const response = await useFetch("events", "GET", { id });
      console.log(response.data);
    }

    getEventData();
  });

  console.log(id);
  return (
    <div>
      <h1>Event {id} page</h1>
    </div>
  );
}
