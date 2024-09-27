import { useState } from "react";
import UserViewChats from "./UserViewChats";

export default function ChatPagePeopleFilters({ color, specUsers, userData }) {
  const [searchText, setSearchText] = useState("");
  const specUsersCopy = specUsers;
  const [allFiltersTypes, setAllFiltersTypes] = useState([
    specUsersCopy.filter((user) => userData.willParticipate.includes(user.id)),
    specUsersCopy.filter((user) => user.role === "admin"),
    specUsersCopy.filter((user) => user.role === "organizer"),
    specUsers.filter((user) => user.role === "participant"),
  ]);

  //Function that handles filter of users to be easier to find
  function filterHandler(e, index) {
    const searchText = e.target.value;
    //In case the string is cleared, returns every option
    if (searchText === "") {
      setAllFiltersTypes((oldFilters) => {
        oldFilters[index] = specUsers.filter(
          (user) => user.role === "participant"
        );

        return oldFilters;
      });
    }
    const regex = new RegExp(searchText, "i");

    setAllFiltersTypes((oldFilters) => {
      let newFilters = [...oldFilters];

      newFilters[index] = newFilters[index].filter((value) =>
        regex.test(value.firstName + " " + value.lastName)
      );

      return newFilters;
    });
  }

  return (
    <div
      className="basis-3/12 flex flex-col items-center overflow-y-scroll"
      style={{
        backgroundColor: color.hardColor,
        borderTopLeftRadius: "18px",
      }}
    >
      {/*Organizers*/}
      {allFiltersTypes[0].length > 0 && (
        <div className="w-full flex flex-col items-center border-b-2 border-black">
          <p className="text-sm italic opacity-50 p-1">
            Organizers of events that you will participate
          </p>
          {allFiltersTypes[0].length > 3 && (
            <input
              className="w-1/2"
              type="text"
              placeholder="Search by name"
              onChange={(e) => filterHandler(e, 0)}
            />
          )}
          {allFiltersTypes[0].map((organizer) => (
            <UserViewChats
              key={organizer.id}
              currentUserId={userData.id}
              userData={organizer}
              color={color}
            />
          ))}
        </div>
      )}

      {/*Administrators*/}
      {allFiltersTypes[1].length > 0 && (
        <div className="w-full flex flex-col items-center border-b-2 border-black">
          <p className="text-sm italic opacity-50 p-1">
            Administrators of the side
          </p>
          {allFiltersTypes[1].length > 3 && (
            <input
              className="w-1/2"
              type="text"
              placeholder="Search by name"
              onChange={(e) => filterHandler(e, 1)}
            />
          )}
          {allFiltersTypes[1].map((admin) => (
            <UserViewChats
              key={admin.id}
              currentUserId={userData.id}
              userData={admin}
              color={color}
            />
          ))}
        </div>
      )}

      {/*All organizers*/}
      {allFiltersTypes[2].length > 0 && (
        <div className="w-full flex flex-col items-center border-b-2 border-black">
          <p className="text-sm italic opacity-50 p-1">Organizers</p>
          {allFiltersTypes[2].length > 3 && (
            <input
              className="w-1/2"
              type="text"
              placeholder="Search by name"
              onChange={(e) => filterHandler(e, 2)}
            />
          )}
          {allFiltersTypes[2].map((participant) => (
            <UserViewChats
              key={participant.id}
              currentUserId={userData.id}
              userData={participant}
              color={color}
            />
          ))}
        </div>
      )}

      {/*Participants*/}
      <div className="w-full flex flex-col items-center border-b-2 border-black">
        <p className="text-sm italic opacity-50 p-1">Other users</p>
        <input
          className="w-1/2"
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterHandler(e, 3)}
        />
        {allFiltersTypes[3].map((participant) => (
          <UserViewChats
            key={participant.id}
            currentUserId={userData.id}
            userData={participant}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}
