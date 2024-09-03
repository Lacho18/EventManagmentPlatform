import { changeSingleEventHandler } from "../../store/singleEventSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

/*
  Vsichki poleta rabotqt
  1. Napravi proverki za validnost na dannite na survura
  2. Izobrazi suobshteniqta za greshka
  3. Opravi lilaviq theme color
  4. Napravi logikata za zakupuvaneto na bilet
    4.1. ID na eventa da se dobavq v "willParticipate" masiva na potrebitelq
    4.2. Da se dicrementira broq na mestata za eventa sled zakypka
    4.3. Sumata ot kypeniq bilet da se dobavi kum "moneySpent" poleto na potrebitelq
    4.4. Da se dobavi logika v koqto event ne moje da bude cuknat i izglejda po siv ili bezcveten ako veche nqma svobodni mesta
*/

export default function EventCreation() {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.singleEvent.eventData);
  const color = useSelector((state) => state.themeColor.color);
  const keys = Object.keys(eventData);

  function changeHandler(e, index = -1) {
    console.log(e.target.name);
    dispatch(
      changeSingleEventHandler({
        name: e.target.name,
        value: e.target.value,
        index: index,
      })
    );
  }

  function addButtonHandler(field) {
    let array = [...eventData[field]];
    array.push("");
    dispatch(
      changeSingleEventHandler({ name: field, value: array, index: -1 })
    );
  }

  async function submitHandler(e) {
    e.preventDefault();

    const result = await useFetch("events", "POST", eventData);
  }

  return (
    <div
      className="w-screen h-screen flex justify-center"
      style={{ backgroundColor: color.hardColor }}
    >
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
                          className="border-2 text-xl rounded p-2"
                          onClick={() => addButtonHandler(key)}
                        >
                          +
                        </button>
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
                    name={subKey}
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
                  type="text"
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
