import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

import "./Filters.css";

export default function Filters() {
  let color = useSelector((state) => state.themeColor.color);
  const [minMax, setMinMax] = useState({
    lowestPrice: 0,
    highestPrice: 100,
  });

  useEffect(() => {
    async function getMinAndMaxPrices() {
      const result = await useFetch("events", "GET", {
        conditions: { minAndMaxPrice: true },
      });

      if (result.status === 200) {
        setMinMax(result.data.data);
        console.log(minMax);
      }
    }

    getMinAndMaxPrices();
  }, []);

  return (
    <div
      className={`w-2/12 fixed flex flex-col border-x-4 filters-div`}
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
        <div>
          <div className="flex justify-between">
            <p>{minMax.lowestPrice}</p>
            <p>{minMax.highestPrice}</p>
          </div>
          <input type="range" min="1" max="100" />
        </div>
        <button>By date</button>
        <button>Most expensive</button>
        <button>Least expensive</button>
      </div>
    </div>
  );
}
