import { useSelector } from "react-redux";
import EventsView from "./EventsView";
import Filters from "./Filters";
import NavigationHome from "./NavigationHome";

export default function Home() {
  const color = useSelector((state) => state.themeColor.color);

  return (
    <div
      className="w-screen h-scree overflow-hidden"
      style={{
        backgroundColor: color.lightColor,
      }}
    >
      <NavigationHome />
      <div className="flex w-full mt-20">
        <Filters color={color} />
        <EventsView color={color} />
      </div>
    </div>
  );
}
