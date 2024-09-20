import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

export default function AllUsers({ color }) {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      const result = await useFetch("allUsers", "GET", {});

      if (result.status === 200) {
        setAllUsers(result.data.allUsers);
      } else {
        console.log(result.data.message);
      }
    }

    getAllUsers();
  }, []);
  if (allUsers.length === 0) return <div>Loading....</div>;
  return (
    <div
      className="w-3/5 h-2/3 rounded-3xl flex flex-wrap items-center justify-evenly overflow-scroll gap-10"
      style={{
        backgroundColor: color.lightColor,
        border: "7px solid " + color.color,
      }}
    >
      {allUsers.map((user) => (
        <div
          className="flex items-center justify-between w-auto h-auto gap-7 p-4 rounded-2xl"
          style={{
            border: "4px solid " + color.heavyColor,
            backgroundColor: color.hardColor,
            cursor: "pointer",
            width: "300px",
            height: "100px",
          }}
          onClick={() => navigate("/admin/userPage/" + user.id)}
        >
          <div className="basis-1/3">
            <img
              className="w-14 h-14"
              src={
                user.userImage
                  ? "http://localhost:3000/" + user.userImage
                  : "https://www.svgrepo.com/show/350417/user-circle.svg"
              }
              alt="Image not found"
            />
          </div>
          <div className="basis-2/3 flex flex-col">
            <p className="uppercase">{user.role}</p>
            <div className="text-sm">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>
                Email: <span className="font-bold">{user.email}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
