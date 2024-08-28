import { useSelector } from "react-redux";
import "./EventHomepage.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function EventHomepage({ event }) {
  const navigate = useNavigate();
  const location = event.location;

  //Handling the date object ---------------------------------
  const dateOfTheEvent = new Date(event.event_date);

  // Extract day, month, and year
  const day = dateOfTheEvent.getUTCDate(); // Use getUTCDate() for consistent results
  const month = dateOfTheEvent.getUTCMonth() + 1; // getUTCMonth() returns 0-based index, so add 1
  const year = dateOfTheEvent.getUTCFullYear();

  // Format the day and month with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Construct the formatted date string
  const dateForm = `${formattedDay}/${formattedMonth}/${year}`;
  //-------------------------------------------------------------------

  const color = useSelector((state) => state.themeColor.color);

  return (
    <div
      className="flex main-div-event-home"
      style={{
        border: `3px solid ${color.heavyColor}`,
        backgroundColor: color.lightColor,
      }}
      onClick={() => navigate("/event/" + event.id)}
    >
      <div className="flex flex-col basis-2/12 justify-center items-center">
        <img className="self-center" src={event.image[0]} />
      </div>
      <div className="basis-7/12 flex flex-col">
        <p className="text-gray-400 italic org-text text-sm basis-1/12 ml-5">
          Organized by <span className="underline">Asen Asenov</span>
        </p>
        <div className="flex flex-col basis-8/12 p-0 justify-evenly items-start ml-4">
          <p style={{ fontSize: "1.75em" }}>On {dateForm}</p>
          <p className="font-bold" style={{ fontSize: "2.5rem" }}>
            {event.name}
          </p>
        </div>
        <div className="basis-3/12 flex text-2xl justify-around pt-2 ml-3">
          <FaLocationDot />
          <p>
            Country:{" "}
            <span className="font-bold" style={{ color: color.hardColor }}>
              {location[0]}
            </span>
          </p>
          <p>
            Town:{" "}
            <span className="font-bold" style={{ color: color.hardColor }}>
              {location[1]}
            </span>
          </p>
          <p>
            Location:{" "}
            <span className="font-bold" style={{ color: color.hardColor }}>
              {location[2]}
            </span>
          </p>
        </div>
      </div>
      <div
        className="flex flex-col basis-3/12 justify-between border-l-4 m-0"
        style={{ borderColor: color.hardColor }}
      >
        <p className="italic text-sm basis-1/12">Places left:</p>
        <p
          className="basis-8/12 self-center font-bold"
          style={{ fontSize: "5em" }}
        >
          {event.places}
        </p>
        <div
          className="flex w-full basis-3/12 border-t-4 justify-end items-end"
          style={{ borderColor: color.hardColor }}
        >
          <p className="text-lg">
            ticket price:{" "}
            <span
              className="font-bold text-3xl"
              style={{ color: color.heavyColor }}
            >
              {event.price} BGN
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
