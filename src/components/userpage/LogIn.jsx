import { useState } from "react";
import "./LogIn.css";
import useFetch from "../../hooks/useFetch";

export default function LogIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setLoginData((oldData) => {
      return { ...oldData, [event.target.name]: event.target.value };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    const keys = Object.keys(loginData);
    let isCorrect = true;

    keys.forEach((key) => {
      if (loginData[key] === "") {
        isCorrect = false;
        //setErrorMessage("All fields are required");

        //setTimeout(() => setErrorMessage(""), 3000);
      }
    });

    if (isCorrect) {
      const response = await useFetch("user", "GET", loginData);
      console.log(response.user);

      if (response.status !== 200) {
        //setErrorMessage(response.message);
        //setTimeout(() => setErrorMessage(""), 3000);
      } else {
        console.log(response.user);
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
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
            onChange={changeHandler}
          />
        </div>

        <div className="flex-col">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </div>

        <button className="submit-btn">Log in</button>
      </form>
    </div>
  );
}
