//icons
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { LiaSaveSolid } from "react-icons/lia";
import { MdSkipPrevious } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";

import "./NavigationHome.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { show } from "../../store/clickSlice";

import OptionsWindow from "./NavigationHomeComp/OptionsWindow";

export default function NavigationHome() {
  const dispatch = useDispatch();

  //Gets the value of the window, whether it is shown or not
  const shownData = useSelector((state) => state.click.shown);

  //Gets the data of a user if he has logged in and empty object {} if he is not
  const userData = useSelector((state) => state.user.userData);

  //Variable that has the data for the theme colors on the side
  const themeColorsData = useSelector((state) => state.themeColor);

  return (
    <div
      className="w-full h-20 flex text-2xl border-b-4 z-50 fixed top-0"
      style={{
        backgroundColor: themeColorsData.color.easyColor,
        borderColor: themeColorsData.color.hardColor,
      }}
    >
      {
        /*The window that shows when clicking on the user icon*/ shownData && (
          <OptionsWindow userData={userData} />
        )
      }
      <div
        className="basis-2/5 h-full flex justify-center items-center border-x-2"
        style={{ borderColor: themeColorsData.color.hardColor }}
      >
        <FaUserCircle
          style={{ fontSize: "3em", marginRight: "12px" }}
          onClick={(event) => {
            //Checks if the window is shown in order to prevent activating the global event and show and hide immediately the user window
            if (!shownData) {
              event.stopPropagation();
            }
            //Calls the show function which manage the state inside clickSlice.js file
            dispatch(show());
          }}
        />
        <p>
          {userData.firstName ? (
            `${userData.firstName} ${userData.lastName}`
          ) : (
            <Link className="underline" to="/logIn">
              Log in
            </Link>
          )}
        </p>
      </div>

      {Object.keys(userData).length === 0 ? (
        <p className="basis-3/5 h-full flex justify-center items-center underline italic">
          Log in to use the application features
        </p>
      ) : (
        <div className="basis-3/5 h-full buttons-nav">
          <Link to="/chat">
            <IoChatbubbleEllipses className="mr-2 text-3xl" /> Chats
          </Link>
          <button>
            <LiaSaveSolid className="mr-2 text-3xl" /> Saved{" "}
            {userData.savedEvents.length > 0 && (
              <div className="bg-orange-500 rounded-full text-sm w-5 h-5">
                {userData.savedEvents.length}
              </div>
            )}
          </button>
          <button>
            <MdSkipPrevious className="mr-2 text-3xl" /> Passed
          </button>
          {userData.role === "organizer" && (
            <Link to="/newEvent">
              <IoMdAddCircle className="mr-2 text-3xl" /> Add event
            </Link>
          )}
          {userData.role === "admin" && (
            <Link to="/admin">
              <MdAdminPanelSettings className="mr-2 text-3xl" /> Admin page
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
