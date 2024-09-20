import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewColor, changeColor } from "../../store/themeColorSlice";
import { useNavigate } from "react-router";
import { nullError, setError } from "../../store/errorSlice";

export default function ThemeColor({ color }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [newColor, setNewColor] = useState({
    color: "",
    easyColor: "",
    lightColor: "",
    hardColor: "",
    heavyColor: "",
  });
  const error = useSelector((state) => state.error.errorMessage);

  //Handles every change in the input fields
  function changeHandler(e) {
    setNewColor((oldValue) => {
      return { ...oldValue, [e.target.name]: e.target.value };
    });
  }

  //Handles the form submit
  function submitHandler(e) {
    e.preventDefault();

    let keys = Object.keys(newColor);
    //Checks if inside the RGB fields there are letters and different symbols
    const regex = /^[0-9,\s]+$/;

    let emptyFields = false;
    let wrongRGB = 0;

    //Checks for empty fields and incorrect RGB values
    keys.forEach((key) => {
      if (newColor[key] === "") {
        emptyFields = true;
      }

      if (!regex.test(newColor[key])) {
        wrongRGB++;
      }
    });

    if (emptyFields) {
      dispatch(setError("All fields are required!"));
      setTimeout(() => dispatch(nullError()), 3000);
      return;
    }

    if (wrongRGB > 1) {
      dispatch(
        setError("Please insert correct RGB values! (Example: 255, 0, 125)")
      );
      setTimeout(() => dispatch(nullError()), 3000);
      return;
    }

    //Removes the color element, because it does not need RGB value
    keys.shift();
    const finalColorObject = {
      color: newColor.color,
    };

    //Checks for valid numbers in the RGB value and sets the values to css rgb function
    emptyFields = false;
    keys.forEach((key) => {
      finalColorObject[key] = setRGBValue(newColor[key]);
      if (finalColorObject[key] === "") {
        emptyFields = true;
      }
    });

    if (!emptyFields) {
      //Adds new color to the array of colors
      dispatch(addNewColor(finalColorObject));
      //Change the color theme to the new color
      dispatch(changeColor({ selection: newColor.color }));
      //Navigates to the main page
      navigation("/");
    }
  }

  //Function that checks for valid RGB values and returns the formed CSS RGB function
  function setRGBValue(text) {
    let colors = text.split(",");

    if (colors.length !== 3) {
      dispatch(setError("Not correct RGB input"));
      setTimeout(() => dispatch(nullError()), 3000);
      return "";
    }

    let validRGBNumber = true;

    colors.forEach((singleColorNumber) => {
      if (singleColorNumber < 0 || singleColorNumber > 255) {
        validRGBNumber = false;
      }
    });

    if (!validRGBNumber) {
      dispatch(setError("Correct RGB value is around 0 and 255!"));
      setTimeout(() => dispatch(nullError()), 3000);
      return "";
    }

    let formedRGB = `rgb(${colors.join(",")})`;

    return formedRGB;
  }

  return (
    <div
      className="w-3/5 h-2/3 rounded-3xl flex flex-col items-center justify-evenly"
      style={{
        backgroundColor: color.lightColor,
        border: "7px solid " + color.color,
      }}
    >
      {error !== "" && <p className="font-bold text-red-500">{error}</p>}
      <p className="text-3xl font-bold" style={{ color: color.heavyColor }}>
        New theme color page
      </p>
      <form className="w-4/5 flex flex-col gap-5" onSubmit={submitHandler}>
        <div className="flex w-full items-center justify-evenly">
          <label
            htmlFor="color"
            style={{ color: color.color === "black" ? "white" : "black" }}
          >
            Enter theme name
          </label>
          <input
            className="w-1/2 p-2"
            type="text"
            name="color"
            placeholder="Theme color"
            onChange={changeHandler}
          />
        </div>

        <div className="flex w-full items-center justify-evenly ">
          <label
            htmlFor="easyColor"
            style={{ color: color.color === "black" ? "white" : "black" }}
          >
            Enter easy theme color RGB value
          </label>
          <input
            className="w-1/2 p-2"
            type="text"
            name="easyColor"
            placeholder="Easy color"
            onChange={changeHandler}
          />
        </div>

        <div className="flex w-full items-center justify-evenly ">
          <label
            htmlFor="lightColor"
            style={{ color: color.color === "black" ? "white" : "black" }}
          >
            Enter light color RGB value
          </label>
          <input
            className="w-1/2 p-2"
            type="text"
            name="lightColor"
            placeholder="Light color"
            onChange={changeHandler}
          />
        </div>

        <div className="flex w-full items-center justify-evenly ">
          <label
            htmlFor="hardColor"
            style={{ color: color.color === "black" ? "white" : "black" }}
          >
            Enter hard color RGB value
          </label>
          <input
            className="w-1/2 p-2"
            type="text"
            name="hardColor"
            placeholder="Hard color"
            onChange={changeHandler}
          />
        </div>

        <div className="flex w-full items-center justify-evenly ">
          <label
            htmlFor="heavyColor"
            style={{ color: color.color === "black" ? "white" : "black" }}
          >
            Enter heavy color RGB value
          </label>
          <input
            className="w-1/2 p-2"
            type="text"
            name="heavyColor"
            placeholder="Heavy color"
            onChange={changeHandler}
          />
        </div>
        <input
          type="submit"
          value="Submit theme color"
          style={{
            backgroundColor: color.color,
            padding: "5px",
            border: "none",
          }}
        />
      </form>
    </div>
  );
}
