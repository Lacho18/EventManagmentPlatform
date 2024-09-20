import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router";

/*
  1. Dobavi ban button functionality
  2. Napravi vuzmoshno trieneto, updaitvaneto i savaneto na eventi ot tqhnata lichna stranica
  3. Da ne e vuzmojno stiganeto do stranica na event na koyto nqma svobodni mesta
  4. ?Dobavi tablica za theme colors i pravi requesti kum neq
  5. Pochni chat app
*/

export default function UserPageAdminView({ color }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [eventsOrganizing, setEventsOrganizing] = useState([]);
  const [organizedPassedEvents, setOrganizedPassedEvents] = useState([]);
  let yearsOld = 0;

  if (currentUser.dateOfBirth) {
    let today = new Date();
    let dateOfBirth = new Date(currentUser.dateOfBirth);
    yearsOld = today.getFullYear() - dateOfBirth.getFullYear();
  }

  useEffect(() => {
    async function getUserData() {
      const result = await useFetch("allUsers", "GET", {
        conditions: { id: id },
      });

      setCurrentUser(result.data.allUsers[0]);

      //If the selected user is organizer get data by the events he is organizing or has organized
      if (result.data.allUsers[0].role === "organizer") {
        //Gets the future events organized by the selected user
        const organizedEvents = await useFetch("events", "GET", {
          conditions: { organizer_ID: result.data.allUsers[0].id },
        });

        if (organizedEvents.status === 200) {
          setEventsOrganizing(organizedEvents.data.data);
        }

        //Gets the passed events organized by the selected user
        const passedEvents = await useFetch("events", "GET", {
          conditions: {
            organizer_ID: result.data.allUsers[0].id,
          },
          tableName: "passedEvents",
        });

        if (passedEvents.status === 200) {
          setOrganizedPassedEvents(passedEvents.data.data);
        }
      }
    }

    getUserData();
  }, []);

  if (!currentUser.id) return <div>Loading.....</div>;
  return (
    <div
      className="w-4/5 h-screen rounded-3xl flex flex-col overflow-scroll"
      style={{
        backgroundColor: color.lightColor,
        border: "7px solid " + color.color,
      }}
    >
      <div className="flex items-center justify-start w-full h-auto p-4">
        <img
          className="w-28 h-28 rounded-full"
          src={
            currentUser.userImage
              ? "http://localhost:3000/" + currentUser.userImage
              : "https://www.svgrepo.com/show/350417/user-circle.svg"
          }
        />
        <div>
          <p className="text-3xl pl-10">
            {currentUser.firstName} {currentUser.lastName}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full p-4">
        <div className="flex flex-col">
          <p>Email:</p>
          <p className="font-bold">{currentUser.email}</p>
        </div>
        <div className="flex flex-col">
          <p>Gender:</p>
          <p className="font-bold">{currentUser.gender}</p>
        </div>
        <div className="flex flex-col">
          <p>Spent money:</p>
          <p className="font-bold">{currentUser.moneySpent}</p>
        </div>
        <div className="flex flex-col">
          <p>Years old:</p>
          <p className="font-bold">{yearsOld}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {eventsOrganizing.length > 0 ? (
          <div className="p-4">
            <p className="font-bold m-3">Organizing events</p>
            <div className="flex gap-3 flex-wrap">
              {eventsOrganizing.map((event) => (
                <div
                  className="flex w-64 items-center justify-between p-3 rounded-2xl cursor-pointer"
                  style={{
                    border: "3px solid " + color.heavyColor,
                    backgroundColor: color.hardColor,
                  }}
                  onClick={() => navigate("/event/" + event.id)}
                >
                  <img className="w-14 h-14" src={event.image[0]} />
                  <div>
                    <p className="font-bold">{event.name}</p>
                    <div className="flex gap-3">
                      <p>Places {event.places}</p>
                      <p>Price: {event.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="font-bold text-red-500 p-4">No organizing events!</p>
        )}

        {organizedPassedEvents.length > 0 ? (
          <div className="p-4 w-full">
            <p className="font-bold m-3">Organized events</p>
            <div className="flex gap-3 flex-wrap">
              {organizedPassedEvents.map((event) => (
                <div
                  className="flex w-64 items-center justify-between p-3 rounded-2xl cursor-pointer"
                  style={{
                    border: "3px solid " + color.heavyColor,
                    backgroundColor: color.hardColor,
                  }}
                >
                  <img className="w-14 h-14" src={event.image[0]} />
                  <div>
                    <p className="font-bold">{event.name}</p>
                    <div className="flex gap-3">
                      <p>Places {event.places}</p>
                      <p>Price: {event.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="font-bold text-red-500 p-4">No passed events!</p>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg">
          Participated in :{" "}
          <span className="text-2xl font-bold">
            {currentUser.eventParticipate.length}
          </span>
        </p>
      </div>
      <div className="p-4">
        <p className="text-lg">
          Will participate in :{" "}
          <span className="text-2xl font-bold">
            {currentUser.willParticipate.length}
          </span>
        </p>
      </div>
      <div className="p-4 w-full flex justify-end">
        <button className="p-5 text-lg font-bold bg-red-500 border-black border-4 rounded-md">
          Ban user
        </button>
      </div>
    </div>
  );
}
