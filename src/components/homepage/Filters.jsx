import { useSelector } from "react-redux";

export default function Filters() {
  let color = useSelector((state) => state.themeColor.color);

  return (
    <div
      className={`w-2/12 fixed flex flex-col border-x-4 `}
      style={{
        height: "624px",
        backgroundColor: color.lightColor,
        borderColor: color.hardColor,
      }}
    >
      <p className="text-center text-2xl font-bold mt-6">Filters</p>
      <div
        className="flex flex-col items-center basis-2/5 justify-evenly text-lg border-b-4"
        style={{ borderColor: color.hardColor }}
      >
        <button>Coming events</button>
        <button>Passed events</button>
      </div>
      <div className="flex flex-col items-center basis-3/5 justify-evenly text-lg">
        {/*<input type="range" min="1" max="100" value="50" />*/}
        <button>By date</button>
        <button>Most expensive</button>
        <button>Least expensive</button>
      </div>
    </div>
  );
}
