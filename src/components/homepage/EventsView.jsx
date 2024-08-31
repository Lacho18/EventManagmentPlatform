import EventHomepage from "../eventsComponents/EventHomepage";
import { useEffect, useState } from "react";
import { changePage, getEventsData } from "../../store/eventsSlice";
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
  const eventsSliceStates = useSelector((state) => state.events);
  const [loading, setLoading] = useState(true);

  //Variable that calculates the maximum number of pages, by dividing the number of events in the database on the fixed number of elements on a page
  const maxPages = Math.ceil(
    eventsSliceStates.maxEventsNumber / eventsSliceStates.elementsOnPage
  );

  useEffect(() => {
    async function fetchEventData() {
      const reqBody = {
        paging: true,
        currentPage: eventsSliceStates.currentPage,
        elementsLimit: eventsSliceStates.elementsOnPage,
        orderBy: eventsSliceStates.orderType,
      };
      const response = await useFetch("events", "GET", reqBody);

      if (response.status === 200) {
        dispatch(getEventsData({ data: response.data.events }));
        setLoading(false);
      }
    }

    fetchEventData();
  }, [eventsSliceStates.currentPage]);

  function selectPageHandler(page) {
    dispatch(changePage({ selectedPage: page }));
  }

  return (
    <div
      className="overflow-scroll h-full w-10/12 absolute right-full"
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
        <div>
          {eventsSliceStates.eventsData.map((event) => (
            <EventHomepage
              key={event.id}
              event={event}
              userData={userData}
              userHasLoggedIn={userHasLoggedIn}
              color={color}
              useFetch={useFetch}
            />
          ))}
          <div className="flex self-end w-auto">
            {Array.from({ length: maxPages }).map((_, index) => {
              return (
                <button
                  className="p-2 m-3 border-2 bg-white rounded"
                  onClick={() => {
                    selectPageHandler(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
