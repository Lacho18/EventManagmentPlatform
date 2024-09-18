import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { setEventHandler } from "../../store/singleEventSlice";
import { setError } from "../../store/errorSlice";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = useSelector((state) => state.themeColor.color);
  const error = useSelector((state) => state.error.errorMessage);
  const eventData = useSelector((state) => state.singleEvent.eventData);
  console.log(eventData);

  useEffect(() => {
    async function getSelectedEvent() {
      console.log("EHOOOOOOOOO");
      const result = await useFetch("events", "GET", {
        conditions: { id: Number(id) },
      });

      if (result.status === 200) {
        dispatch(setEventHandler(result.data.data[0]));
      } else {
        dispatch(setError(result.data.message));
      }
    }

    getSelectedEvent();
  }, []);

  return (
    <div
      className="w-screen h-auto min-h-screen flex items-center justify-center"
      style={{ backgroundColor: color.hardColor }}
    >
      <div
        className="w-2/5 h-auto"
        style={{ backgroundColor: color.lightColor }}
      >
        <form></form>
      </div>
    </div>
  );
}
