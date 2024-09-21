import { useNavigate } from "react-router";
import { MdAddBox, MdBookmarkRemove, MdBrowserUpdated } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { changeHandler } from "../../store/userSlice";
import { setError } from "../../store/errorSlice";
import useFetch from "../../hooks/useFetch";

export default function EventFunctionButton({
  userHasLoggedIn,
  userData,
  event,
  deleteEventHandler,
  error,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Adds event to saved events
  async function saveEventHandler(eventId, method, e) {
    e.stopPropagation();

    if (userData.id) {
      const response = await useFetch("saveEvent", method, {
        userId: userData.id,
        eventId,
      });

      if (response.status === 200) {
        dispatch(
          changeHandler({
            operation: "userData",
            fieldName: "savedEvents",
            value: response.data.data.savedEvents,
          })
        );
      }
    } else {
      dispatch(setError("You should log in in order to save event!"));
      setTimeout(() => dispatch(nullError()), 3000);
    }
  }

  return (
    <div className="z-30">
      {userHasLoggedIn && (
        <div className="flex justify-end items-center">
          {/*Button for deleting event, visible only from the organizer of the vent and the administrator*/}
          {(userData.role === "admin" ||
            userData.id === event.organizer_ID) && (
            <button
              className="text-3xl"
              onClick={(e) => deleteEventHandler(event.id, e)}
            >
              <TiDelete />
            </button>
          )}

          {/*Button for updating event, visible only from the organizer of the event and the administrator*/}
          {(userData.role === "admin" ||
            userData.id === event.organizer_ID) && (
            <button
              className="text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/UpdateEvent/" + event.id);
              }}
            >
              <MdBrowserUpdated />
            </button>
          )}

          {/*Button that adds the current event to the saved events of the user*/}
          <button className=" text-3xl">
            {userData.savedEvents && userData.savedEvents.includes(event.id) ? (
              <MdBookmarkRemove
                onClick={(e) => saveEventHandler(event.id, "DELETE", e)}
              />
            ) : (
              <MdAddBox onClick={(e) => saveEventHandler(event.id, "GET", e)} />
            )}
            {error !== "" && <p>{error}</p>}
          </button>
        </div>
      )}
    </div>
  );
}
