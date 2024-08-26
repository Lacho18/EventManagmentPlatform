import { useSelector } from "react-redux";
import EventsView from "./EventsView";
import Filters from "./Filters";
import NavigationHome from "./NavigationHome";

export default function Home() {
  const color = useSelector((state) => state.themeColor.color);
  console.log(color);
  return (
    <div
      className="w-screen h-scree"
      style={{ color: color.color === "black" ? "white" : "black" }}
    >
      <NavigationHome />
      <div className="flex">
        <Filters />
        <EventsView />
      </div>
    </div>
  );
}
