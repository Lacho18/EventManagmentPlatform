import { useEffect } from "react";
import axios from "axios";
import "./LogIn.css";
import useFetch from "../../hooks/useFetch";

export default function LogIn() {
  // Test za vruskata s route na survura, uspeshen.
  useEffect(() => {
    async function fetchData() {
      //const response = await axios.get("http://localhost:3000/user");
      const result = await useFetch("user", "GET", {});
      console.log(result.message);
    }

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <form className="flex flex-col justify-center w-2/5 h-auto form-container">
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input type="email" name="email" placeholder="@email" />
        </div>

        <div className="flex-col">
          <label htmlFor="password">Enter your password</label>
          <input type="password" name="password" placeholder="password" />
        </div>

        <button className="submit-btn">Log in</button>
      </form>
    </div>
  );
}
