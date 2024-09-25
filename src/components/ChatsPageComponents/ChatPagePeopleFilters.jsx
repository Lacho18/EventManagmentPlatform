import UserViewChats from "./UserViewChats";

export default function ChatPagePeopleFilters({ color, specUsers, userData }) {
  /*
    1.Dovurshi tykashnata logica
    2.Napravi go ako ima poveche ot dvada da se visuzlizirat s view more buton
    3.Zapochni socket arhitectyrata
  */

  const specUsersCopy = specUsers;

  //Gets the organizers of the events that the user will participate
  const organizersOfEventsThatWillParticipate = specUsersCopy.filter((user) =>
    userData.willParticipate.includes(user.id)
  );

  //Getting all the administrators
  const administrators = specUsersCopy.filter((user) => user.role === "admin");

  //Gets limited amount of participants
  let participants = specUsers.filter((user) => user.role === "participant");

  if (participants.length > 4) {
    participants = participants.slice(0, 3);
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
      <div className="w-full flex flex-col items-center border-b-2 border-black">
        <p className="text-sm italic opacity-50 p-1">
          Organizers of events that you will participate
        </p>
        {organizersOfEventsThatWillParticipate.map((organizer) => (
          <UserViewChats
            key={organizer.id}
            currentUserId={userData.id}
            userData={organizer}
            color={color}
          />
        ))}
      </div>

      {/*Administrators*/}
      <div className="w-full flex flex-col items-center border-b-2 border-black">
        <p className="text-sm italic opacity-50 p-1">
          Administrators of the side
        </p>
        {administrators.map((admin) => (
          <UserViewChats
            key={admin.id}
            currentUserId={userData.id}
            userData={admin}
            color={color}
          />
        ))}
      </div>

      {/*Participants*/}
      <div className="w-full flex flex-col items-center border-b-2 border-black">
        <p className="text-sm italic opacity-50 p-1">Other users</p>
        {participants.map((participant) => (
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
