//icons
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { LiaSaveSolid } from "react-icons/lia";
import { MdSkipPrevious } from "react-icons/md";

import "./NavigationHome.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { show } from "../../store/clickSlice";

import { logOut } from "../../store/userSlice";
import { toggleWindow, changeColor } from "../../store/themeColorSlice";

export default function NavigationHome() {
  const dispatch = useDispatch();

  //Gets the value of the window, whether it is shown or not
  const shownData = useSelector((state) => state.click.shown);

  //Gets the data of a user if he has logged in and empty object {} if he is not
  const userData = useSelector((state) => state.user.userData);

  //Variable that has the data for the theme colors on the side
  const themeColorsData = useSelector((state) => state.themeColor);

  function changeThemeColor(event, selectedOption) {
    dispatch(changeColor({ selection: selectedOption }));
  }

  return (
    <div
      className="w-full h-20 flex text-2xl border-b-4 z-50 sticky top-0"
      style={{
        backgroundColor: themeColorsData.color.easyColor,
        borderColor: themeColorsData.color.hardColor,
      }}
    >
      {shownData && (
        <div className="absolute z-40 text-xl flex flex-col justify-between h-auto user-side-nav">
          {Object.keys(userData).length !== 0 ? (
            <div className="flex flex-col nav-user-window">
              <button onClick={() => dispatch(logOut())}>Log out</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleWindow());
                }}
              >
                Theme color
              </button>
              {themeColorsData.sideWindow && (
                <div className="absolute top-16 left-full ml-4 bg-gray-300 flex">
                  {themeColorsData.options.map((option) => (
                    <button
                      key={option.color}
                      onClick={(e) => changeThemeColor(e, option.color)}
                      style={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: `${option.color}`,
                      }}
                    ></button>
                  ))}
                </div>
              )}
              <button>Update profile</button>
              <button>View chats</button>
            </div>
          ) : (
            <div className="flex flex-col nav-user-window">
              <Link to="/logIn">Log in</Link>
              <Link to="/signUp">Sign up</Link>
            </div>
          )}
        </div>
      )}
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
      <div className="basis-3/5 h-full buttons-nav">
        <button>
          <IoChatbubbleEllipses className="mr-2 text-3xl" /> Chats
        </button>
        <button>
          <LiaSaveSolid className="mr-2 text-3xl" /> Saved
        </button>
        <button>
          <MdSkipPrevious className="mr-2 text-3xl" /> Passed
        </button>
      </div>
    </div>
  );
}
