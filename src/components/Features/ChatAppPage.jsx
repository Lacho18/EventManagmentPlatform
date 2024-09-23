import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import ChatPageLeft from "../ChatsPageComponents/ChatPageLeft";
import ChatPagePeopleFilters from "../ChatsPageComponents/ChatPagePeopleFilters";
import { Link } from "react-router-dom";

export default function ChatAppPage() {
  const navigate = useNavigate();
  const color = useSelector((state) => state.themeColor.color);
  const userData = useSelector((state) => state.user.userData);
  const userHasLoggedIn = useSelector((state) => state.user.hasLoggedIn);

  let leavingTimeout = null;

  useEffect(() => {
    navigate("/chat/18/17");
    return () => {
      //Clears the timeout if user leaves the page earlier
      if (leavingTimeout) {
        clearTimeout(leavingTimeout);
      }
    };
  }, []);

  if (!userHasLoggedIn) {
    leavingTimeout = setTimeout(() => navigate("/"), 3000);
    return (
      <div
        className="w-screen h-screen flex justify-center items-center text-red-500 font-bold"
        style={{ backgroundColor: color.hardColor, fontSize: "5em" }}
      >
        You should log in to access this page
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen min-h-screen flex flex-col"
      style={{ backgroundColor: color.heavyColor }}
    >
      <div
        className="basis-2/12 w-full justify-between flex pl-7 pr-7"
        style={{ backgroundColor: color.lightColor, boxSizing: "border-box" }}
      >
        <div className="flex items-center h-full basis-2/6">
          <img
            className="w-20 h-20 rounded-full"
            src={
              userData.userImage
                ? "http://localhost:3000/" + userData.userImage
                : "https://www.svgrepo.com/show/350417/user-circle.svg"
            }
            alt="Image not found!"
          />
          <p className="text-2xl font-bold pl-4">
            {userData.firstName} {userData.lastName}
          </p>
        </div>
        <div className="h-full basis-2/6 flex items-center justify-center">
          <p className="text-3xl font-bold">Chat application</p>
        </div>
        <div className="h-full basis-2/6 flex items-center justify-end buttons-nav">
          <Link className="mr-4 text-3xl" to="/">
            Home
          </Link>
          {userData.role === "organizer" && (
            <Link className="mr-4 text-3xl" to="/newEvent">
              Add event
            </Link>
          )}
          {userData.role === "admin" && (
            <Link className="mr-4 text-3xl" to="/admin">
              Admin page
            </Link>
          )}
        </div>
      </div>
      <div className="basis-10/12 w-full flex">
        <ChatPageLeft color={color} />
        {/*<ChatsWindow color={color} />*/}
        <Outlet />
        <ChatPagePeopleFilters color={color} />
      </div>
    </div>
  );
}
