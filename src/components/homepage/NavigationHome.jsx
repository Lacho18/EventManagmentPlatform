//icons
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { LiaSaveSolid } from "react-icons/lia";
import { MdSkipPrevious } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";

import "./NavigationHome.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { show } from "../../store/clickSlice";

import OptionsWindow from "./NavigationHomeComp/OptionsWindow";
import { getEventsData } from "../../store/eventsSlice";
import { onSavedButtonClicked, removeSaved } from "../../store/userSlice";

export default function NavigationHome({
  userData,
  hasLoggedIn,
  onSavedItems,
  dispatch,
  useFetch,
}) {
  //Gets the value of the window, whether it is shown or not
  const shownData = useSelector((state) => state.click.shown);

  //Variable that has the data for the theme colors on the side
  const themeColorsData = useSelector((state) => state.themeColor);

  const eventsSliceStates = useSelector((state) => state.events);

  //Function that handles the click of the saved items button
  //This visualize in 'EventView' only the saved events from the user'
  async function saveButtonHandler() {
    //Checks if there is a user that has logged in
    if (hasLoggedIn) {
      //Checks if the view is not already on saved items
      if (!onSavedItems) {
        console.log("Ehooooo");
        const result = await useFetch("events", "GET", {
          conditions: { id: userData.savedEvents },
        });

        if (result.status === 200) {
          //Sets the onSavedItems variable to true
          dispatch(onSavedButtonClicked());
          dispatch(getEventsData({ data: result.data.data }));
        }
      } else {
        //Removes the saved items and brings all events again
        const result = await useFetch("events", "GET", {
          currentPage: eventsSliceStates.currentPage,
          limit: eventsSliceStates.elementsOnPage,
          orderBy: eventsSliceStates.orderType,
        });
        dispatch(removeSaved());
        dispatch(getEventsData({ data: result.data.data }));
      }
    }
  }

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
        {userData.userImage === null ||
        userData.userImage === "empty" ||
        !hasLoggedIn ? (
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
        ) : (
          <img
            className="w-20 h-20 rounded-full mr-3"
            src={"http://localhost:3000/" + userData.userImage}
            alt="No image ;)"
            onClick={(event) => {
              //Checks if the window is shown in order to prevent activating the global event and show and hide immediately the user window
              if (!shownData) {
                event.stopPropagation();
              }
              //Calls the show function which manage the state inside clickSlice.js file
              dispatch(show());
            }}
          />
        )}
        <p>
          {hasLoggedIn ? (
            `${userData.firstName} ${userData.lastName}`
          ) : (
            <Link className="underline" to="/logIn">
              Log in
            </Link>
          )}
        </p>
      </div>

      {!hasLoggedIn ? (
        <p className="basis-3/5 h-full flex justify-center items-center underline italic">
          Log in to use the application features
        </p>
      ) : (
        <div className="basis-3/5 h-full buttons-nav">
          <Link to="/chat">
            <IoChatbubbleEllipses className="mr-2 text-3xl" /> Chats
          </Link>
          <button onClick={saveButtonHandler}>
            <LiaSaveSolid className="mr-2 text-3xl" /> Saved{" "}
            {userData.savedEvents && userData.savedEvents.length > 0 && (
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
