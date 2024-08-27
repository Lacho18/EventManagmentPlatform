import { useSelector } from "react-redux";
import EventsView from "./EventsView";
import Filters from "./Filters";
import NavigationHome from "./NavigationHome";

export default function Home() {
  const color = useSelector((state) => state.themeColor.color);
  console.log(color);
  return (
    <div
      className="w-screen h-scree overflow-hidden"
      style={{
        color: color.color === "black" ? "white" : "black",
        backgroundColor: color.lightColor,
      }}
    >
      <NavigationHome />
      <div className="flex w-full">
        <Filters />
        <EventsView />
      </div>
    </div>
  );
}
