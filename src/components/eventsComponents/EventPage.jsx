import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import useDateFormat from "../../hooks/useDateFormat";
import { FaLocationDot } from "react-icons/fa6";

/*
    4. Napravi getRequestHandler funciqta po abstraktna i q implementiray v userControler
    5. Napravi malko po vidimo che moje da se natiskat subitiqta v Home stranicata
    6?. Dobavi fyncionalnost za redactirane na profil
*/

export default function EventPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({});
  const color = useSelector((state) => state.themeColor.color);
  const loading = useSelector((state) => state.loading);
  const formattedDate = useDateFormat(eventData.event_date);

  const [currentImage, setCurrentImage] = useState(1);

  //gets the data for the selected event event
  useEffect(() => {
    async function getEventData() {
      dispatch(setLoading({ boolValue: true }));
      const response = await useFetch("events", "GET", {
        conditions: { id: id },
        join: { joiningWith: "users", fieldsToGet: ["firstName", "lastName"] },
      });
      setEventData(response.data.eventData);
      dispatch(setLoading({ boolValue: false }));
      console.log(eventData);
      console.log(response.data.eventData);
      console.log(eventData.image[0]);
    }

    getEventData();

    return () => {
      console.log("On dismount!");
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

  if (loading.isLoading) {
    return <div>{loading.loadingMessage}</div>;
  } else {
    return (
      <div
        className="w-full h-auto"
        style={{ backgroundColor: color.hardColor }}
      >
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
            <p className="text-2xl font-bold">{eventData.users_data}</p>
            <button className="underline text-lg">Open chat</button>
            <p className="underline text-lg">Nqkakuv email</p>
          </div>
          <div className="basis-1/2 flex justify-center items-center">
            <img
              className="w-44 h-44"
              style={{ borderRadius: "50%" }}
              src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
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
          <button
            className="ml-10 p-3 rounded text-center"
            style={{
              backgroundColor: color.lightColor,
              border: "2px solid " + color.heavyColor,
            }}
          >
            Buy ticket
          </button>
          <p className="pr-10 text-3xl">
            Price: <span className="font-bold">{eventData.price} BGN</span>
          </p>
        </div>
      </div>
    );
  }
}
