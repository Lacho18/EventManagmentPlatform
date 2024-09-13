import {
  changeSingleEventHandler,
  clearSingleEventState,
} from "../../store/singleEventSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { nullError, setError } from "../../store/errorSlice";

/*
  4. Napravi logikata za zakupuvaneto na bilet
    4.1. ID na eventa da se dobavq v "willParticipate" masiva na potrebitelq
    4.2. Da se dicrementira broq na mestata za eventa sled zakypka
    4.3. Sumata ot kypeniq bilet da se dobavi kum "moneySpent" poleto na potrebitelq
    4.4. Da se dobavi logika v koqto event ne moje da bude cuknat i izglejda po siv ili bezcveten ako veche nqma svobodni mesta
*/

export default function EventCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const eventData = useSelector((state) => state.singleEvent.eventData);
  //Cloning the object in order to change its prototype
  const cloneEventData = { ...eventData };
  const color = useSelector((state) => state.themeColor.color);
  const error = useSelector((state) => state.error.errorMessage);

  //Makes organizer_ID field not enumerable
  Object.defineProperty(cloneEventData, "organizer_ID", {
    enumerable: false,
  });

  const keys = Object.keys(cloneEventData);

  //Handles the changes in the fields
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

  //Sends the inserted data to post the event and handles errors
  async function submitHandler(e) {
    e.preventDefault();

    if (!userData.id) {
      dispatch(
        setError(
          "You should log in user account to post an event. This request will not be submitted"
        )
      );
      setTimeout(() => dispatch(nullError()), 5000);

      return;
    }

    dispatch(
      changeSingleEventHandler({ name: "organizer_ID", value: userData.id })
    );

    const result = await useFetch("events", "POST", {
      ...eventData,
      organizer_ID: userData.id,
    });

    if (result.status === 400) {
      dispatch(setError(result.data.message));
      setTimeout(() => dispatch(nullError()), 3000);

      return;
    }

    if (result.data.id) {
      navigate("/event/" + result.data.id);
    }

    dispatch(clearSingleEventState());
    console.log(result.data.message);
  }

  if (!userData.id)
    return (
      <div>
        <p>You should log in organizer account to create event</p>
        <Link to="/logIn" className="underline">
          Log in
        </Link>
      </div>
    );

  return (
    <div
      className="w-screen h-screen flex justify-center"
      style={{ backgroundColor: color.hardColor }}
    >
      {error !== "" && (
        <p className="text-red-600 font-bold absolute">{error}</p>
      )}
      <div
        className="w-1/3 h-full overflow-scroll p-10"
        style={{ backgroundColor: color.lightColor }}
      >
        <p className="text-center text-2xl">Event data.</p>
        <p className="text-center text-sm italic">
          Please fill all text fields
        </p>
        <form onSubmit={submitHandler}>
          {keys.map((key) => {
            //Only if the key value is Date
            if (eventData[key] === null) {
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

            if (Array.isArray(eventData[key])) {
              return (
                <div key={key} className="p-2 m-5 formGroup">
                  <label htmlFor={key}>
                    Enter event <span className="font-bold">{key}s</span>
                  </label>
                  {eventData[key].map((indexValue, index) => (
                    <div key={index * 10}>
                      <p>
                        {key} {index + 1}
                      </p>
                      <div className="flex">
                        <input
                          type="text"
                          className="p-2"
                          name={key}
                          placeholder={key + " " + (index + 1)}
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

            if (typeof eventData[key] === "object") {
              let subKeys = Object.keys(eventData[key]);

              let component = subKeys.map((subKey, index) => (
                <div key={index} className="p-2 m-5 subFormGroup">
                  <label htmlFor={subKey}>
                    Enter event <span className="font-bold">{subKey}</span>
                  </label>
                  <input
                    type="text"
                    className="p-1"
                    name={key + "." + subKey}
                    placeholder={subKey}
                    onChange={changeHandler}
                  />
                </div>
              ));

              return (
                <div key={key} className="p-3 border-l-2">
                  <p className="font-bold">{key}</p>
                  {component}
                </div>
              );
            }

            return (
              <div key={key} className="p-2 m-5 formGroup">
                <label htmlFor={key}>
                  Enter event <span className="font-bold">{key}</span>
                </label>
                <input
                  type={typeof eventData[key] === "number" ? "number" : "text"}
                  className="text-xl p-2"
                  name={key}
                  placeholder={key}
                  onChange={changeHandler}
                />
              </div>
            );
          })}

          <input
            type="submit"
            className="font-bold p-3"
            style={{ backgroundColor: color.color }}
          />
        </form>
      </div>
    </div>
  );
}
