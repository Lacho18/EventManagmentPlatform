import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import {
  changeSingleEventHandler,
  clearSingleEventState,
  setEventHandler,
} from "../../store/singleEventSlice";
import { nullError, setError } from "../../store/errorSlice";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = useSelector((state) => state.themeColor.color);
  const error = useSelector((state) => state.error.errorMessage);
  const eventData = useSelector((state) => state.singleEvent.eventData);
  const userHasLoggedIn = useSelector((state) => state.user.hasLoggedIn);
  const userData = useSelector((state) => state.user.userData);

  //Setting the organizer_id to enumerable false in order to be ignored from the map function
  const eventDataClone = { ...eventData };
  Object.defineProperty(eventDataClone, "organizer_ID", {
    enumerable: false,
  });

  const keys = Object.keys(eventDataClone);

  useEffect(() => {
    async function getSelectedEvent() {
      //Getting the data for the updated event
      const result = await useFetch("events", "GET", {
        conditions: { id: Number(id) },
      });

      //Setting the global state to the selected event
      if (result.status === 200 && result.data.data.length === 1) {
        //Deleting the id of the returned object in order to be the same as singleEvent structure
        delete result.data.data[0].id;
        dispatch(setEventHandler(result.data.data[0]));

        //Changing the returned date type to instance of the Date class
        dispatch(
          changeSingleEventHandler({
            name: "event_date",
            value: new Date(result.data.data[0].event_date),
            index: -1,
          })
        );

        console.log(result.data.data[0].location);

        //Changing the location field to an object. In the database location field is an array, but here it should be object
        dispatch(
          changeSingleEventHandler({
            name: "location",
            value: {
              country: result.data.data[0].location[0],
              town: result.data.data[0].location[1],
              address: result.data.data[0].location[2],
            },
            index: -1,
          })
        );
      } else {
        dispatch(setError(result.data.message));
      }
    }

    getSelectedEvent();

    return () => {
      dispatch(clearSingleEventState());
    };
  }, []);

  //Handles every change in a state
  function changeHandler(e, index = -1) {
    dispatch(
      changeSingleEventHandler({
        name: e.target.name,
        value: e.target.value,
        index: index,
      })
    );
  }

  //In array fields this function creates new element that can be inserted
  function addButtonHandler(field) {
    let array = [...eventData[field]];
    array.push("");
    dispatch(
      changeSingleEventHandler({ name: field, value: array, index: -1 })
    );
  }

  //In array fields this function removes given element by index
  function removeButtonHandler(field, index) {
    let array = [...eventData[field]];
    array.splice(index, 1);

    dispatch(
      changeSingleEventHandler({ name: field, value: array, index: -1 })
    );
  }

  async function updateSubmitHandler(e) {
    e.preventDefault();

    const result = await useFetch("events", "PUT", { ...eventData, id: id });

    if (result.status !== 200) {
      dispatch(setError(result.data.message));
      setTimeout(() => dispatch(nullError()), 3000);
    } else {
      dispatch(setError(result.data.message));
      setTimeout(() => {
        dispatch(nullError());
        navigate("/event/" + result.data.eventId);
      }, 3000);
    }
  }

  //In case the user has not logged in
  if (!userHasLoggedIn)
    return (
      <div
        className="w-screen h-screen flex justify-center items-center font-bold text-3xl text-red-500"
        style={{ backgroundColor: color.hardColor }}
      >
        You should log in in your organizer account to update this event
      </div>
    );

  //If the user is participant
  if (userData.role === "participant")
    return (
      <div
        className="w-screen h-screen flex justify-center items-center font-bold text-3xl text-red-500"
        style={{ backgroundColor: color.hardColor }}
      >
        Participants are not allowed to this page!
      </div>
    );

  //In case the logged in user is not neither organizer of the event or admin
  if (userData.role !== "admin" && userData.id !== eventData.organizer_ID)
    return (
      <div
        className="w-screen h-screen flex justify-center items-center font-bold text-3xl text-red-500"
        style={{ backgroundColor: color.hardColor }}
      >
        You does not have access to this page
      </div>
    );

  return (
    <div
      className="w-screen h-auto min-h-screen flex items-center justify-center"
      style={{ backgroundColor: color.hardColor }}
    >
      {error !== "" && (
        <p
          className="text-red-600 font-bold fixed"
          style={{ top: "50%", left: "15%" }}
        >
          {error}
        </p>
      )}
      <div
        className="w-2/5 h-auto"
        style={{ backgroundColor: color.lightColor }}
      >
        <form onSubmit={updateSubmitHandler}>
          <p className="text-3xl text-center mt-1">Event update</p>
          <p className="text-center italic">
            Please change the data you want to update and submit it!
          </p>
          {keys.map((key) => {
            //Returning nothing on null value
            if (eventData[key] === null) {
              return;
            }
            //Handling date objects
            if (eventData[key] instanceof Date) {
              return (
                <div key={key} className="p-2 m-3 text-lg formGroup">
                  <label htmlFor={key}>
                    Enter <span className="font-bold">{key}</span>
                  </label>
                  <input
                    className="text-xl p-2"
                    type="date"
                    name={key}
                    onChange={changeHandler}
                  />
                </div>
              );
            }

            // If the event data is an array
            if (Array.isArray(eventData[key])) {
              return (
                <div key={key} className="p-2 m-5 formGroup">
                  <label htmlFor={key}>
                    Enter event <span className="font-bold">{key}s</span>
                  </label>
                  {eventData[key].map((indexValue, index) => (
                    <div key={index * 10} className="p-1">
                      <p>
                        {key} {index + 1}
                      </p>
                      <div className="flex">
                        <input
                          type="text"
                          className="p-2"
                          name={key}
                          value={eventData[key][index]}
                          placeholder={`${key} ${index + 1}`}
                          onChange={(e) => changeHandler(e, index)}
                        />
                        <button
                          type="button"
                          className="border-2 text-xl rounded p-2"
                          onClick={() => addButtonHandler(key)}
                        >
                          +
                        </button>
                        {eventData[key].length > 1 && index !== 0 && (
                          <button
                            type="button"
                            className="border-2 text-xl rounded p-2"
                            onClick={() => removeButtonHandler(key, index)}
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            // If the event data is an object (for nested fields)
            if (typeof eventData[key] === "object" && eventData[key] !== null) {
              const subKeys = Object.keys(eventData[key]);

              return (
                <div key={key} className="p-3 border-l-2">
                  <p className="font-bold">{key}</p>
                  {subKeys.map((subKey, index) => (
                    <div key={index} className="p-2 m-5 subFormGroup">
                      <label htmlFor={subKey}>
                        Enter event <span className="font-bold">{subKey}</span>
                      </label>
                      <input
                        type="text"
                        className="p-1"
                        name={`${key}.${subKey}`}
                        placeholder={subKey}
                        value={eventData[key][subKey]}
                        onChange={changeHandler}
                      />
                    </div>
                  ))}
                </div>
              );
            }

            // Default case for other data types (string, number, etc.)
            return (
              <div key={key} className="p-2 m-3 formGroup">
                <label htmlFor={key}>
                  Enter <span className="font-bold">{key}</span>
                </label>
                <input
                  className="text-xl p-2"
                  type="text"
                  name={key}
                  value={eventData[key]}
                  onChange={changeHandler}
                />
              </div>
            );
          })}

          <input
            type="submit"
            className="font-bold p-3 mb-3"
            style={{ backgroundColor: color.color }}
          />
        </form>
      </div>
    </div>
  );
}
