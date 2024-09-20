import { useSelector } from "react-redux";

export default function PageNotFound() {
  const color = useSelector((state) => state.themeColor.color);

  return (
    <div
      className="uppercase text-red-500 w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: color.hardColor }}
    >
      <p style={{ fontSize: "6em" }}>404 Page not found</p>
    </div>
  );
}
