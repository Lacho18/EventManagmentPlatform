import { useDispatch, useSelector } from "react-redux";
import "./EventHomepage.css";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useDateFormat from "../../hooks/useDateFormat";
import { useEffect, useState } from "react";
import { MdAddBox, MdBookmarkRemove } from "react-icons/md";
import { setError, nullError } from "../../store/errorSlice";
import { changeHandler } from "../../store/userSlice";

export default function EventHomepage({
  event,
  userHasLoggedIn,
  userData,
  color,
  useFetch,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = event.location;

  const error = useSelector((state) => state.error.errorMessage);

  useEffect(() => {
    setHover({
      border: `3px solid ${color.heavyColor}`,
      backgroundColor: color.lightColor,
    });
  }, [color]);

  const [hover, setHover] = useState({
    border: `3px solid ${color.heavyColor}`,
    backgroundColor: color.lightColor,
  });

  const dateOfTheEvent = new Date(event.event_date);
  const dateForm = useDateFormat(dateOfTheEvent);

  async function saveEventHandler(eventId, method, e) {
    e.stopPropagation();

    if (userData.id) {
      const response = await useFetch("saveEvent", method, {
        userId: userData.id,
        eventId,
      });

      if (response.status === 200) {
        dispatch(
          changeHandler({
            operation: "userData",
            fieldName: "savedEvents",
            value: response.data.data.savedEvents,
          })
        );
      }
    } else {
      dispatch(setError("You should log in in order to save event!"));
      setTimeout(() => dispatch(nullError()), 3000);
    }
  }

  return (
    <div
      id={event.id}
      className="flex main-div-event-home"
      style={hover}
      onClick={() => navigate("/event/" + event.id)}
      onMouseEnter={() =>
        setHover({
          border: `3px solid ${color.hardColor}`,
          backgroundColor: color.easyColor,
        })
      }
      onMouseLeave={() =>
        setHover({
          border: `3px solid ${color.heavyColor}`,
          backgroundColor: color.lightColor,
        })
      }
    >
      <div className="flex flex-col basis-2/12 justify-center items-center">
        <img className="self-center" src={event.image[0]} />
      </div>
      <div className="basis-7/12 flex flex-col">
        <p className="text-gray-400 italic org-text text-sm basis-1/12 ml-5">
          Organized by{" "}
          <span className="underline">
            {event.firstName} {event.lastName}
          </span>
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
        className="flex flex-col basis-3/12 justify-between border-l-4 m-0 relative"
        style={{ borderColor: color.hardColor }}
      >
        {userHasLoggedIn && (
          <button
            className="absolute left-full text-3xl"
            style={{ transform: "translate(-100%)" }}
          >
            {userData.savedEvents && userData.savedEvents.includes(event.id) ? (
              <MdBookmarkRemove
                onClick={(e) => saveEventHandler(event.id, "DELETE", e)}
              />
            ) : (
              <MdAddBox onClick={(e) => saveEventHandler(event.id, "GET", e)} />
            )}
            {error !== "" && <p>{error}</p>}
          </button>
        )}

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
