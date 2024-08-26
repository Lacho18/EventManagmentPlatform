import "./LogIn.css";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { logIn, changeHandler, nullData } from "../../store/userSlice";
import { setError, nullError } from "../../store/errorSlice";
import { useNavigate } from "react-router";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.error.errorMessage);

  //Variable that takes a login data for the user
  const loginDataUser = useSelector((state) => state.user.loginUser);

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
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      {errorMessage !== "" && (
        <p className="text-red-600 font-bold absolute">{errorMessage}</p>
      )}
      <form
        className="flex flex-col justify-center w-2/5 h-auto form-container"
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="@email"
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

        <button className="submit-btn">Log in</button>
      </form>
    </div>
  );
}
