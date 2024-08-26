import { useSelector } from "react-redux";

export default function EventsView() {
  const color = useSelector((state) => state.themeColor.color);

  return (
    <div
      className="bg-gray-400 w-full"
      style={{ backgroundColor: color.hardColor }}
    >
      <h1>Events content</h1>
    </div>
  );
}
