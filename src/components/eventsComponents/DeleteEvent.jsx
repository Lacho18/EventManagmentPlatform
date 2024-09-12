export default function DeleteEvent({
  userData,
  eventData,
  closeWindow,
  useFetch,
}) {
  /*
        1. Napishi logicata za triene na event
            1.1 Dobavi novo pole v structuranta na event v koeto shte sa idtata na userite koito sa si kupili bileti
            1.2 Pri triene na event za vshichki IDTa v tozi nov masiv mahni gi v masiva willParticipate na vseki user
            1.3 Vrushtanento na parite shte e premahvane na sumata na bileta ot moneySpent na user
        
        2. Izmisli metod za update na event
    */

  async function deletingEvent(e) {
    e.stopPropagation();
    const result = await useFetch("events", "DELETE", { eventData });
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 z-40 bg-white rounded-3xl flex flex-col justify-center p-10"
      style={{ transform: "translate(-75%, -50%)" }}
    >
      <div className="flex flex-col justify-center items-center m-5">
        <p>
          <span className="font-bold text-lg">
            {userData.firstName} {userData.lastName}
          </span>
          , are you sure you want to remove event{" "}
        </p>
        <p className="font-bold text-lg">{eventData.name} from the database</p>
        <p>This operation will remove the event completely!</p>
        <p className="text-center">
          All purchased tickets and money spent from the users will be returned!
        </p>
      </div>
      <div className="flex justify-evenly">
        <button
          className="p-3 bg-green-500 rounded-xl"
          onClick={(e) => deletingEvent(e)}
        >
          Continue
        </button>
        <button
          className="p-3 bg-red-600 rounded-xl"
          onClick={(e) => {
            e.stopPropagation();
            closeWindow();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
