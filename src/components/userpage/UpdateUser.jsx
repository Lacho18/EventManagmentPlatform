import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nullData, changeHandler, logIn } from "../../store/userSlice";
import { nullError, setError } from "../../store/errorSlice";
import useFetch from "../../hooks/useFetch";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const updatedData = useSelector((state) => state.user.signUpUser);
  const error = useSelector((state) => state.error.errorMessage);

  const color = useSelector((state) => state.themeColor.color);

  //Nulls the signUpUser field from userSlice in order to be empty object by entering and leaving this component
  useEffect(() => {
    dispatch(nullData({ operation: "signUpUser" }));

    return () => {
      dispatch(nullData({ operation: "signUpUser" }));
    };
  }, []);

  //Separates all keys if the user is logged in
  let userKeys;
  if (Object.keys(user).length > 0) {
    userKeys = Object.keys(user);
  }

  //Handles all changes that appear in every input field
  function onChangeHandler(event) {
    dispatch(
      changeHandler({
        operation: "signUpUser",
        fieldName: event.target.name,
        value: event.target.value,
      })
    );
  }

  //Handles the submit event. Sends the updated data
  async function updateUserSubmitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(updatedData);

    //Checks if something is updated
    if (keys.length === 0) {
      dispatch(
        setError("You should change something in order to update your data")
      );
      setTimeout(() => dispatch(nullError()), 3000);

      return;
    }

    let emptyFields = false;

    //Checks if there are empty fields
    keys.forEach((key) => {
      if (updatedData[key] === "") {
        emptyFields = true;
      }
    });

    if (emptyFields) {
      dispatch(setError("All fields should be field with updated values"));
      setTimeout(() => dispatch(nullError()), 3000);

      return;
    }

    //Sends the updated data with id in order to update only the given user
    const updatedObject = await useFetch("user", "PUT", {
      updatedData,
      id: user.id,
    });

    console.log(updatedObject);

    if (updatedObject.status === 200) {
      dispatch(setError(updatedObject.data.message));
      setTimeout(() => dispatch(nullError()), 1500);

      //Sets the updated data to the already logged in user
      dispatch(logIn(updatedObject.data.data));
    } else {
      dispatch(setError(updatedObject.data.message));
      setTimeout(() => dispatch(nullError()), 3000);
    }
  }

  //Removes fields from the iteration that can not be modified by the user himself
  const userCopy = { ...user };
  Object.defineProperties(userCopy, {
    role: { enumerable: false },
    savedEvents: { enumerable: false },
    userImage: { enumerable: false },
    chats: { enumerable: false },
    willParticipate: { enumerable: false },
  });

  if (Object.keys(user).length > 0) {
    return (
      <div
        className="w-screen h-auto min-h-screen flex justify-center items-center"
        style={{ backgroundColor: color.hardColor }}
      >
        <div className="w-2/3 h-auto">
          {error !== "" && (
            <p className="text-red-600 font-bold absolute">{error}</p>
          )}
          <p className="text-3xl">
            Welcome{" "}
            <span className="font-bold" style={{ color: color.easyColor }}>
              {user.firstName} {user.lastName}
            </span>
          </p>
          <p className="italic">
            Here you can change specific data about your profile
          </p>

          <form
            className="flex flex-col justify-center"
            onSubmit={updateUserSubmitHandler}
          >
            {Object.keys(userCopy).map((userField, index) => {
              if (userField !== "id" && userField !== "role") {
                return (
                  <div key={index}>
                    <label
                      className="pt-2 font-bold"
                      htmlFor={userField}
                      style={color.color === "black" ? { color: "white" } : {}}
                    >
                      Change your {userField}
                    </label>
                    <input
                      className="p-2"
                      type="text"
                      name={userField}
                      placeholder={user[userField]}
                      onChange={onChangeHandler}
                      style={{
                        color:
                          color.color === "black" ? "white" : color.heavyColor,
                        backgroundColor: color.lightColor,
                      }}
                    />
                  </div>
                );
              } else if (userField === "role") {
                return (
                  <div key={index}>
                    <label className="pt-2 font-bold" htmlFor={userField}>
                      Change your {userField}
                    </label>
                    <select
                      className="p-2"
                      name={userField}
                      onChange={onChangeHandler}
                      style={{
                        color:
                          color.color === "black" ? "white" : color.heavyColor,
                        backgroundColor: color.lightColor,
                      }}
                    >
                      <option>participant</option>
                      <option>organizer</option>
                    </select>
                  </div>
                );
              }
            })}
            <button
              className="submit-btn"
              style={{
                backgroundColor: color.color,
                color: color.color === "black" ? "white" : "black",
              }}
            >
              Update profile
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-red-500">
          You should log in your account to access this page!
        </p>
      </div>
    );
  }
}
