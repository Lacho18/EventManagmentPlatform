import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPage({ color }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  /*useEffect(() => {
    //Creates event that controls the click of the back button
    window.addEventListener("popstate", () => {
      navigate("/");
    });

    return () => {
      //Removes the event that controls the click of the back button
      window.removeEventListener("popstate", () => {
        navigate("/");
      });
    };
  }, []);*/

  return (
    <div
      className="w-3/5 h-2/3 rounded-3xl flex flex-col items-center justify-evenly"
      style={{
        backgroundColor: color.lightColor,
        border: "7px solid " + color.color,
      }}
    >
      <p className="text-3xl gap-1/3">
        Welcome{" "}
        <span className="font-bold">
          {userData.firstName} {userData.lastName}
        </span>
      </p>
      <div className="gap-2/3 flex flex-col text-3xl gap-6 p-4 w-full">
        <div
          className="m-3 p-1 rounded-2xl text-center"
          style={{
            border: "4px solid " + color.hardColor,
            backgroundColor: color.easyColor,
          }}
        >
          <Link to="/admin/addThemeColor">Add theme color</Link>
        </div>
        <div
          className="m-3 p-1 rounded-2xl text-center"
          style={{
            border: "4px solid " + color.hardColor,
            backgroundColor: color.easyColor,
          }}
        >
          <Link to="/admin/viewUsers">View users profiles</Link>
        </div>
      </div>
    </div>
  );
}
