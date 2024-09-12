import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function BuyTicket({
  eventId,
  userId,
  name,
  price,
  placesLeft,
  answerNo,
}) {
  const [answerYes, setAnswerYes] = useState(false);
  const [ticketNumbers, setTicketNumbers] = useState(2);

  console.log(userId);

  function submitBoughtTicket(numberOfTickets) {
    const result = useFetch("buyTicket", "POST", {
      eventId: eventId,
      userId: userId,
      ticketsAmount: numberOfTickets,
    });
  }

  if (answerYes) {
    return (
      <div
        className="fixed top-1/2 left-1/2 z-40 bg-white rounded-3xl flex flex-col justify-center p-10"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="flex flex-col justify-center items-center m-5">
          <label>Insert the number of tickets you wish to purchase</label>
          <div className="flex justify-between items-center mb-2 w-full">
            <p>{1}</p>
            <p className="text-xl font-bold">{ticketNumbers}</p>
            <p>{placesLeft}</p>
          </div>
          <input
            type="range"
            min={1}
            max={placesLeft}
            value={ticketNumbers}
            onChange={(e) => setTicketNumbers((oldValue) => e.target.value)}
          />
          <div className="mt-5">
            <label>Or write the number of tickets here!</label>
            <input
              type="number"
              placeholder="number of tickets"
              onChange={(e) => setTicketNumbers((oldValue) => e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-evenly">
          <button
            className="p-3 bg-green-500 rounded-xl"
            onClick={() => submitBoughtTicket(1)}
          >
            Buy just 1
          </button>
          <button
            className="p-3 bg-blue-500 rounded-xl"
            style={
              ticketNumbers === 0 || ticketNumbers === undefined
                ? {
                    pointerEvents: "none",
                    opacity: "0.5",
                  }
                : {}
            }
            onClick={() => submitBoughtTicket(ticketNumbers)}
          >
            Buy {ticketNumbers}
          </button>
          <button
            className="p-3 bg-red-600 rounded-xl"
            onClick={() => answerNo()}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="fixed top-1/2 left-1/2 z-40 bg-white rounded-3xl flex flex-col justify-center p-10"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="flex flex-col justify-center items-center m-5">
        <p>Are you sure you want to purchase ticket for event?</p>
        <p className="font-bold text-lg">{name}</p>
        <p>
          price: <span className="font-bold">{price}</span> BGN
        </p>
      </div>
      <div className="flex justify-evenly">
        <button
          className="p-3 bg-green-500 rounded-xl"
          onClick={() => setAnswerYes(true)}
        >
          Yes
        </button>
        <button
          className="p-3 bg-red-600 rounded-xl"
          onClick={() => answerNo()}
        >
          No
        </button>
      </div>
    </div>
  );
}
