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

  console.log(organizersOfEventsThatWillParticipate);

  //Getting all the administrators
  const administrators = specUsersCopy.filter((user) => user.role === "admin");

  return (
    <div
      className="basis-3/12"
      style={{
        backgroundColor: color.hardColor,
        borderTopLeftRadius: "18px",
      }}
    >
      <p>Chat filters</p>
    </div>
  );
}
