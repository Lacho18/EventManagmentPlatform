import "./LogIn.css";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { logIn, changeHandler, nullData } from "../../store/userSlice";
import { setError, nullError } from "../../store/errorSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { sendMessage } from "../../webSocket";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.error.errorMessage);

  //Variable that takes a login data for the user
  const loginDataUser = useSelector((state) => state.user.loginUser);

  const color = useSelector((state) => state.themeColor.color);

  useEffect(() => {
    const labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
      labels[i].style.color = color.color === "black" ? "white" : "black";
    }
  }, []);

  function enterClickHandler(event) {
    if (event.key === "Enter") {
      submitHandler(event);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(loginDataUser);
    let isCorrect = true;

    keys.forEach((key) => {
      if (loginDataUser[key] === "") {
        isCorrect = false;
        dispatch(setError("All fields are required!"));
        setTimeout(() => dispatch(nullError()), 3000);
      }
    });

    if (Object.keys(loginDataUser).length === 0) {
      isCorrect = false;
      dispatch(setError("All fields are required!"));
      setTimeout(() => dispatch(nullError()), 3000);
    }

    if (isCorrect) {
      const response = await useFetch("user", "GET", loginDataUser);

      if (response.status === 200) {
        sendMessage({ userId: response.data.user.id });
        dispatch(logIn(response.data.user));
        dispatch(nullData({ operation: "loginUser" }));
        navigate("/");
      } else {
        console.log(response);
        dispatch(setError(response.data.message));
        setTimeout(() => dispatch(nullError()), 3000);
      }
    }
  }

  return (
    <div
      className="w-screen h-screen bg-gray-200 flex justify-center items-center"
      style={{ backgroundColor: color.hardColor }}
    >
      {errorMessage !== "" && (
        <p className="text-red-600 font-bold absolute">{errorMessage}</p>
      )}
      <p className="text-3xl font-bold">1qaz?e1qOC</p>
      <form
        className="flex flex-col justify-center w-2/5 h-auto form-container"
        onSubmit={submitHandler}
        onKeyDown={enterClickHandler}
        style={{ backgroundColor: color.lightColor }}
      >
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="@email"
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
            onChange={(event) => {
              dispatch(
                changeHandler({
                  value: event.target.value,
                  fieldName: event.target.name,
                  operation: "loginUser",
                })
              );
            }}
          />
        </div>

        <div className="flex-col">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
            onChange={(event) => {
              dispatch(
                changeHandler({
                  value: event.target.value,
                  fieldName: event.target.name,
                  operation: "loginUser",
                })
              );
            }}
          />
        </div>

        <button
          className="submit-btn"
          style={{
            backgroundColor: color.color,
            color: color.color === "black" ? "white" : "black",
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
