import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import useDateFormat from "../../hooks/useDateFormat";
import { FaLocationDot } from "react-icons/fa6";
import BuyTicket from "./BuyTicket";
import EventFunctionButton from "./EventFunctionButtons";
import DeleteEvent from "./DeleteEvent";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({});
  //Opens the buy ticket window
  const [isBuying, setIsBuying] = useState(false);
  //Opens the delete event window
  const [deleteEvent, setDeleteEvent] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  const userHasLoggedIn = useSelector((state) => state.user.hasLoggedIn);
  const color = useSelector((state) => state.themeColor.color);
  const loading = useSelector((state) => state.loading);
  //Global error variable
  const error = useSelector((state) => state.error.errorMessage);
  //Formats the date on format month day, year
  const formattedDate = useDateFormat(eventData.event_date);

  //The index that visualize the current image in the array of images in the event images array
  const [currentImage, setCurrentImage] = useState(1);
  //State that toggles whether the email is shown or not
  const [shownEmail, setShownEmail] = useState(false);

  console.log(userData);

  //gets the data for the selected event
  useEffect(() => {
    //Finds the selected event
    async function getEventData() {
      dispatch(setLoading({ boolValue: true }));
      const response = await useFetch("events", "GET", {
        conditions: { id: id },
        join: {
          joiningWith: "users",
          fieldsToGet: ["firstName", "lastName", "userImage", "email"],
        },
      });
      setEventData(response.data.data[0]);
      dispatch(setLoading({ boolValue: false }));
    }

    getEventData();

    return () => {
      dispatch(setLoading({ boolValue: true }));
    };
  }, []);

  function imageSliderHandler(value) {
    setCurrentImage((oldValue) => {
      let newValue = (oldValue += value);

      if (newValue >= eventData.image.length) {
        return 0;
      } else if (newValue < 0) {
        return eventData.image.length - 1;
      } else {
        return newValue;
      }
    });
  }

  function buyTicketHandler() {
    setIsBuying(true);
  }

  function deleteEventHandler(id, e) {
    e.stopPropagation();
    setDeleteEvent(true);
    navigate("/");
  }

  if (loading.isLoading) {
    return <div>{loading.loadingMessage}</div>;
  } else {
    if (eventData.places <= 0)
      return (
        <div
          className="w-full h-screen flex justify-center items-center"
          style={{ backgroundColor: color.hardColor }}
        >
          <p style={{ fontSize: "7em" }}>No places left for this event!</p>
        </div>
      );
    return (
      <div
        className="w-full h-auto"
        style={{ backgroundColor: color.hardColor }}
      >
        {userHasLoggedIn && (
          <EventFunctionButton
            userData={userData}
            userHasLoggedIn={userHasLoggedIn}
            event={eventData}
            deleteEventHandler={deleteEventHandler}
            error={error}
          />
        )}

        <div className="flex w-full justify-between pt-10">
          <div className="basis-1/2 flex justify-center items-center">
            <img className="w-8-12 h-72 rounded-2xl" src={eventData.image[0]} />
          </div>
          <div className="basis-1/2 flex flex-col items-end">
            <p
              style={{
                fontSize: "3.5em",
                fontWeight: "bold",
                alignSelf: "start",
                flexBasis: "60%",
                color: color.color !== "black" ? color.heavyColor : "white",
              }}
            >
              {eventData.name}
            </p>
            <p
              style={{
                fontSize: "2.5em",
                fontWeight: "bold",
                alignSelf: "start",
                color: color.color !== "black" ? color.heavyColor : "white",
              }}
            >
              Places left:{" "}
              <span style={{ color: color.easyColor }}>{eventData.places}</span>
            </p>
            <div className="align-bottom text-xl basis-2/5 flex flex-col justify-end items-end p-5">
              <p>on {formattedDate}</p>
              <p>
                duration:{" "}
                <span className="font-bold">{eventData.duration}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex justify-between mt-20"
          style={{ backgroundColor: color.lightColor, borderRadius: "35%" }}
        >
          <div className="basis-1/2 flex flex-col justify-center items-center">
            <p className="text-sm italic">organizer:</p>
            <p className="text-2xl font-bold">
              {eventData.firstName} {eventData.lastName}
            </p>
            <button
              className="underline text-lg"
              onClick={() => {
                navigate(`/chat/${userData.id}/${eventData.organizer_ID}`);
              }}
            >
              Open chat
            </button>
            <button
              className="underline text-lg"
              onClick={() => setShownEmail((oldValue) => !oldValue)}
            >
              {shownEmail ? eventData.email : "Email"}
            </button>
          </div>
          <div className="basis-1/2 flex justify-center items-center">
            <img
              className="w-44 h-44"
              style={{ borderRadius: "50%" }}
              src={
                eventData.userImage !== "empty" || eventData.userImage !== null
                  ? "http://localhost:3000/" + eventData.userImage
                  : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              }
            />
          </div>
        </div>
        <div className="flex mt-20">
          <div className="basis-1/2 flex justify-center">
            <button
              className="w-10 h-96 text-3xl rounded-tl-xl rounded-bl-xl"
              style={{ backgroundColor: color.lightColor }}
              onClick={() => imageSliderHandler(-1)}
            >
              {"<"}
            </button>
            <div className="flex flex-col">
              <img
                className="w-8-12 h-96"
                src={eventData.image[currentImage]}
              />
              <div className="p-0 self-center flex">
                {eventData.image.map((singleImage, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        margin: "3px",
                        backgroundColor:
                          index == currentImage
                            ? "rgb(89, 89, 89)"
                            : "rgb(201, 201, 201)",
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>

            <button
              className="w-10 h-96 text-3xl rounded-tr-xl rounded-br-xl"
              style={{ backgroundColor: color.lightColor }}
              onClick={() => imageSliderHandler(1)}
            >
              {">"}
            </button>
          </div>
          <div className="basis-1/2 flex flex-col">
            <p
              className="text-3xl font-bold"
              style={{
                color: color.color !== "black" ? color.heavyColor : "white",
              }}
            >
              Description
            </p>
            <p className="mt-5 w-10/12">{eventData.description}</p>
          </div>
        </div>
        <div>
          <div className="flex text-2xl w-1/2 justify-between pt-2 ml-3 mt-20">
            <FaLocationDot />
            <p>
              Country:{" "}
              <span className="font-bold" style={{ color: color.heavyColor }}>
                {eventData.location[0]}
              </span>
            </p>
            <p>
              Town:{" "}
              <span className="font-bold" style={{ color: color.heavyColor }}>
                {eventData.location[1]}
              </span>
            </p>
            <p>
              Location:{" "}
              <span className="font-bold" style={{ color: color.heavyColor }}>
                {eventData.location[2]}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-3 pt-2 rounded-3xl border-t-2">
          {userData.id && (
            <button
              className="ml-10 p-3 rounded text-center"
              style={{
                backgroundColor: color.lightColor,
                border: "2px solid " + color.heavyColor,
              }}
              onClick={() => buyTicketHandler()}
            >
              Buy ticket
            </button>
          )}
          <p className="pr-10 text-3xl">
            Price: <span className="font-bold">{eventData.price} BGN</span>
          </p>
        </div>

        {deleteEvent && (
          <DeleteEvent
            userData={userData}
            eventData={eventData}
            closeWindow={() => {
              setDeleteEvent(false);
            }}
            useFetch={useFetch}
            dispatch={dispatch}
            color={color}
          />
        )}

        {isBuying && (
          <BuyTicket
            eventId={eventData.id}
            userId={userData.id}
            name={eventData.name}
            placesLeft={eventData.places}
            price={eventData.price}
            themeColor={color}
            answerNo={() => setIsBuying(false)}
          />
        )}
      </div>
    );
  }
}
