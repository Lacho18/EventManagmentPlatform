import EventsView from "./EventsView";
import Filters from "./Filters";
import NavigationHome from "./NavigationHome";

export default function Home() {
  return (
    <div className="w-screen h-scree">
      <NavigationHome />
      <div className="flex">
        <Filters />
        <EventsView />
      </div>
    </div>
  );
}
