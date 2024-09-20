import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function AllUsers({ color }) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const result = useFetch("GET", "allUsers", {});

    console.log(result);
  }, []);
  return (
    <div
      className="w-3/5 h-2/3 rounded-3xl flex flex-col items-center justify-evenly"
      style={{
        backgroundColor: color.lightColor,
        border: "7px solid " + color.color,
      }}
    >
      <h1>All users</h1>
    </div>
  );
}
