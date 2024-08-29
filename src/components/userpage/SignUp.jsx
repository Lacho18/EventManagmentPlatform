import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setError, nullError } from "../../store/errorSlice";
import { useNavigate } from "react-router-dom";
import { changeHandler, nullData } from "../../store/userSlice";
import { useEffect } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const navigate = useNavigate();

  const color = useSelector((state) => state.themeColor.color);

  //Variable that takes a sign us data for the user
  const signUpDataUser = useSelector((state) => state.user.signUpUser);

  useEffect(() => {
    const labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
      labels[i].style.color = color.color === "black" ? "white" : "black";
    }
  }, []);

  //Function that handles every change in the input fields
  function handleChanges(event) {
    console.log(event.target.value);
    dispatch(
      changeHandler({
        value: event.target.value,
        fieldName: event.target.name,
        operation: "signUpUser",
      })
    );
  }

  async function submitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(signUpDataUser);
    let isCorrect = true;

    if (keys.length < 7) {
      isCorrect = false;
      dispatch(setError("All fields are required!"));
      setTimeout(() => dispatch(nullError()), 3000);
    }

    keys.forEach((key) => {
      if (signUpDataUser[key] === "") {
        isCorrect = false;
        dispatch(setError("All fields are required!"));
        setTimeout(() => dispatch(nullError()), 3000);
      }
    });

    if (isCorrect) {
      const response = await useFetch("user", "POST", signUpDataUser);

      if (response.status !== 200) {
        dispatch(setError(response.data.message));
        setTimeout(() => dispatch(nullError()), 3000);
      } else {
        dispatch(nullData({ operation: "signUpUser" }));
        navigate("/logIn");
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
      <form
        className="form-container"
        onSubmit={submitHandler}
        style={{ backgroundColor: color.lightColor }}
      >
        <div className="form-group">
          <label htmlFor="email" style={{ color }}>
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            placeholder="@email"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">
            <span className="font-bold">Confirm</span> your password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Your first name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Your last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Enter your gender</label>
          <div className="flex">
            <p className="mr-4">Male</p>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChanges}
              style={{
                color: color.color === "black" ? "white" : color.heavyColor,
                backgroundColor: color.lightColor,
              }}
            />
          </div>
          <div className="flex">
            <p className="mr-4">Female</p>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChanges}
              style={{
                color: color.color === "black" ? "white" : color.heavyColor,
                backgroundColor: color.lightColor,
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Select your role</label>
          <p className="text-sm italic">
            Participants can buy tickets and use the chat system
          </p>
          <p className="text-sm italic">
            Organizers can also create events and manage them
          </p>
          <select
            className="mt-3"
            name="role"
            onChange={handleChanges}
            style={{
              color: color.color === "black" ? "white" : color.heavyColor,
              backgroundColor: color.lightColor,
            }}
          >
            <option>participant</option>
            <option>organizer</option>
          </select>
        </div>

        <button
          className="submit-btn"
          style={{
            backgroundColor: color.color,
            color: color.color === "black" ? "white" : "black",
          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
