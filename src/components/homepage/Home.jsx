import { useDispatch, useSelector } from "react-redux";
import EventsView from "./EventsView";
import Filters from "./Filters";
import NavigationHome from "./NavigationHome";
import useFetch from "../../hooks/useFetch";

export default function Home() {
  //Function that calls update states functions
  const dispatch = useDispatch();

  //Variable thats contains the data of the theme color for the side
  const color = useSelector((state) => state.themeColor.color);

  //Gets the data of a user if he has logged in and empty object {} if he is not
  const userData = useSelector((state) => state.user.userData);

  //This variable is true if user has logged in and false if not
  const hasLoggedIn = useSelector((state) => state.user.hasLoggedIn);

  //Checks if the user has selected the saved items
  const onSavedItems = useSelector((state) => state.user.onSavedItems);

  return (
    <div
      className="w-screen h-scree overflow-hidden"
      style={{
        backgroundColor: color.lightColor,
      }}
    >
      <NavigationHome
        userData={userData}
        hasLoggedIn={hasLoggedIn}
        onSavedItems={onSavedItems}
        dispatch={dispatch}
        useFetch={useFetch}
      />
      <div className="flex w-full mt-20">
        <Filters
          color={color}
          dispatch={dispatch}
          useFetch={useFetch}
          onSavedItems={onSavedItems}
        />
        <EventsView
          color={color}
          userData={userData}
          userHasLoggedIn={hasLoggedIn}
          onSavedItems={onSavedItems}
          dispatch={dispatch}
          useFetch={useFetch}
        />
      </div>
    </div>
  );
}
