import EventHomepage from "../eventsComponents/EventHomepage";
import { useEffect, useState } from "react";
import { getEventsData } from "../../store/eventsSlice";
import { removeSaved } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function EventsView({
  color,
  userData,
  userHasLoggedIn,
  onSavedItems,
  dispatch,
  useFetch,
}) {
  //const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.eventsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      const response = await useFetch("events", "GET");

      if (response.status === 200) {
        dispatch(getEventsData({ data: response.data.events }));
        setLoading(false);
      }
    }

    fetchEventData();
  }, []);

  return (
    <div
      className="bg-gray-400  overflow-scroll h-full w-10/12 absolute right-full"
      style={{
        backgroundColor: color.hardColor,
        transform: "translateX(120%)",
      }}
    >
      {onSavedItems && (
        <>
          {userData.savedEvents.length === 0 ? (
            <div>You do not have saved items</div>
          ) : (
            <div className="flex justify-between mb-5">
              <p className="text-3xl p-4">
                <span className="font-bold">
                  {userData.firstName} {userData.lastName}
                </span>
                , these are your saved events!
              </p>
              <button
                className="w-10 h-10 p-2 bg-red-500 rounded m-4"
                onClick={async () => {
                  const result = await useFetch("events", "GET");
                  dispatch(removeSaved());
                  dispatch(getEventsData({ data: result.data.events }));
                }}
              >
                X
              </button>
            </div>
          )}
        </>
      )}

      {loading ? (
        <div>Loading.....</div>
      ) : (
        eventsData.map((event) => (
          <EventHomepage
            key={event.id}
            event={event}
            userData={userData}
            userHasLoggedIn={userHasLoggedIn}
            color={color}
            useFetch={useFetch}
          />
        ))
      )}
    </div>
  );
}
