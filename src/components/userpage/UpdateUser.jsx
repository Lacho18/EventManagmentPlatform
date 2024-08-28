import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nullData, changeHandler } from "../../store/userSlice";
import { nullError, setError } from "../../store/errorSlice";
import useFetch from "../../hooks/useFetch";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const updatedData = useSelector((state) => state.user.signUpUser);
  const error = useSelector((state) => state.error.errorMessage);

  useEffect(() => {
    dispatch(nullData({ operation: "signUpUser" }));

    return () => {
      dispatch(nullData({ operation: "signUpUser" }));
    };
  }, []);

  let userKeys;
  if (Object.keys(user).length > 0) {
    userKeys = Object.keys(user);
  }

  function onChangeHandler(event) {
    console.log("Pizza");
    dispatch(
      changeHandler({
        operation: "signUpUser",
        fieldName: event.target.name,
        value: event.target.value,
      })
    );
  }

  async function updateUserSubmitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(updatedData);

    if (keys.length === 0) {
      dispatch(
        setError("You should change something in order to update your data")
      );
      setTimeout(() => dispatch(nullError()), 3000);

      return;
    }

    let emptyFields = false;

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

    const updatedObject = await useFetch("user", "PUT", {
      updatedData,
      id: user.id,
    });
    console.log(updatedObject.message);
  }

  if (Object.keys(user).length > 0) {
    return (
      <div>
        <div>
          {error !== "" && (
            <p className="text-red-600 font-bold absolute">{error}</p>
          )}
          <p>
            Welcome {user.firstName} {user.lastName}
          </p>
          <p>Here you can change specific data about your profile</p>

          <form onSubmit={updateUserSubmitHandler}>
            {userKeys.map((userField, index) => {
              if (userField !== "id") {
                return (
                  <div key={index}>
                    <label htmlFor={userField}>Change your {userField}</label>
                    <input
                      type="text"
                      name={userField}
                      placeholder={user[userField]}
                      onChange={onChangeHandler}
                    />
                  </div>
                );
              }
            })}
            <button className="submit-btn">Sign up</button>
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
