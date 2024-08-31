import { useEffect, useState } from "react";

import "./Filters.css";
import {
  getEventsData,
  setMaxEvents,
  setOrderType,
} from "../../store/eventsSlice";
import { useSelector } from "react-redux";

export default function Filters({ color, dispatch, useFetch }) {
  const [minMax, setMinMax] = useState({
    lowestPrice: 0,
    highestPrice: 100,
  });
  const eventsSliceStates = useSelector((state) => state.events);

  useEffect(() => {
    async function getMinAndMaxPrices() {
      const result = await useFetch("events", "GET", {
        conditions: { minAndMaxPrice: true },
      });

      if (result.status === 200) {
        let resultSet = {
          lowestPrice: result.data.data.lowestPrice,
          highestPrice: result.data.data.highestPrice,
        };
        setMinMax(resultSet);
        dispatch(setMaxEvents({ totalEvents: result.data.data.totalEvents }));
      }
    }

    getMinAndMaxPrices();
  }, []);

  //Function that sends a specific SQL text as string
  //On the server if conditions is empty object there isn't WHERE clause, so it can be send as string from the frontend
  async function clickHandler(query = "", orderType) {
    dispatch(setOrderType({ orderType }));
    const pageQuery = `${query} OFFSET ${
      (eventsSliceStates.currentPage - 1) * eventsSliceStates.elementsOnPage
    } LIMIT ${eventsSliceStates.elementsOnPage}`;
    const response = await useFetch(
      "events",
      "GET",
      pageQuery !== "" && {
        conditions: {},
        query: pageQuery,
      }
    );

    if (response.status === 200) {
      console.log(response.data.events);
      if (!Array.isArray(response.data.events)) {
        let array = [];
        array.push(response.data.events);
        dispatch(getEventsData({ data: array }));
      } else {
        dispatch(getEventsData({ data: response.data.events }));
      }
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
        <button onClick={() => clickHandler("", "event_date")}>By date</button>
        <button
          onClick={() => {
            clickHandler("ORDER BY price DESC", "price");
          }}
        >
          Most expensive
        </button>
        <button
          onClick={() => {
            clickHandler("ORDER BY price ASC", "price");
          }}
        >
          Least expensive
        </button>
      </div>
    </div>
  );
}
