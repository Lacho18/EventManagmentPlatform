import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: Date,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function changeHandler(event) {
    setNewUser((oldData) => {
      return { ...oldData, [event.target.name]: event.target.value };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(newUser);
    let isCorrect = true;

    keys.forEach((key) => {
      if (newUser[key] === "") {
        isCorrect = false;
        setErrorMessage("All fields are required");

        setTimeout(() => setErrorMessage(""), 3000);
      }
    });

    if (isCorrect) {
      const response = await useFetch("user", "POST", newUser);

      if (response.status !== 200) {
        setErrorMessage(response.message);

        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      {errorMessage !== "" && (
        <p className="text-red-600 font-bold absolute">{errorMessage}</p>
      )}
      <form className="form-container" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="@email"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
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
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Your first name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Your last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={changeHandler}
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
              onChange={changeHandler}
            />
          </div>
          <div className="flex">
            <p className="mr-4">Female</p>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date"
            onChange={changeHandler}
          />
        </div>

        <button className="submit-btn">Log in</button>
      </form>
    </div>
  );
}
