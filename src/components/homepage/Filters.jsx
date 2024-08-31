import { useEffect, useState } from "react";

import "./Filters.css";
import { getEventsData } from "../../store/eventsSlice";

export default function Filters({ color, dispatch, useFetch }) {
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
      }
    }

    getMinAndMaxPrices();
  }, []);

  //Function that sends a specific SQL text as string
  //On the server if conditions is empty object there isn't WHERE clause, so it can be send as string from the frontend
  async function clickHandler(query = "") {
    const response = await useFetch(
      "events",
      "GET",
      query !== "" && {
        conditions: {},
        query,
      }
    );

    if (response.status === 200) {
      dispatch(getEventsData({ data: response.data.events }));
    }
  }

  function priceFilterHandler(event) {
    clickHandler(`WHERE price >= ${event.target.value} ORDER BY price ASC`);
  }

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
          <input
            type="range"
            min={minMax.lowestPrice}
            max={minMax.highestPrice}
            onChange={priceFilterHandler}
          />
        </div>
        <button onClick={() => clickHandler()}>By date</button>
        <button
          onClick={() => {
            clickHandler("ORDER BY price DESC");
          }}
        >
          Most expensive
        </button>
        <button
          onClick={() => {
            clickHandler("ORDER BY price ASC");
          }}
        >
          Least expensive
        </button>
      </div>
    </div>
  );
}
