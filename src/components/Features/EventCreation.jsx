import { changeSingleEventHandler } from "../../store/singleEventSlice";
import eventStructure from "./eventStructure";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

export default function EventCreation() {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.singleEvent.eventData);
  const color = useSelector((state) => state.themeColor.color);
  const keys = Object.keys(eventStructure);

  function changeHandler(e) {
    dispatch(
      changeSingleEventHandler({ name: e.target.name, value: e.target.value })
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
            if (typeof eventStructure[key] === "date") {
              return (
                <div className="p-2 m-3 text-lg formGroup">
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

            if (typeof eventStructure[key] === "object") {
              let subKeys = Object.keys(eventStructure[key]);

              let component = subKeys.map((subKey) => (
                <div className="p-2 m-5 subFormGroup">
                  <label htmlFor={subKey}>
                    Enter event <span className="font-bold">{subKey}</span>
                  </label>
                  <input
                    type="text"
                    className="text-lg p-2"
                    name={subKey}
                    placeholder={subKey}
                    onChange={changeHandler}
                  />
                </div>
              ));

              return component;
            }

            return (
              <div className="p-2 m-5 formGroup">
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
