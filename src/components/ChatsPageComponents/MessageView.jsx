export default function MessageView({ messageData, type, color }) {
  let style = {};
  let receiverStyle = {};

  if (type === "sender") {
    style = {
      maxWidth: "50%",
      backgroundColor: color.easyColor,
      borderTopRightRadius: "40px",
      borderBottomRightRadius: "40px",
    };
  } else {
    style = {
      maxWidth: "50%",
      backgroundColor: color.hardColor,
      borderTopLeftRadius: "40px",
      borderBottomLeftRadius: "40px",
      alignSelf: "flex-end",
    };

    receiverStyle = {
      flexDirection: "row-reverse",
    };
  }

  //Calculates since when lastly the message was sended
  function calculateTime(time) {
    const date = new Date(time);
    const now = new Date();

    const difference = now - date;
    const seconds = Math.round(difference / 1000);
    if (seconds < 60) {
      return { duration: seconds, type: "sec" };
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return { duration: minutes, type: "min" };
    }

    const hours = Math.round(minutes / 60);
    if (hours < 24) {
      return { duration: hours, type: "hours" };
    }
    const days = Math.round(hours / 24);
    if (days < 365) {
      return { duration: days, type: "days" };
    }
    const years = Math.round(days / 365);
    return { duration: years, type: "years" };
  }

  const messageSendBefore = calculateTime(messageData.time_of_send);

  return (
    <div className="w-auto h-auto p-2 mt-2 mb-2 flex flex-col" style={style}>
      <p
        className="text-xs italic opacity-50"
        style={type === "receiver" ? { alignSelf: "flex-end" } : {}}
      >
        Before {messageSendBefore.duration} {messageSendBefore.type}
      </p>
      <div
        className="flex items-center"
        style={type === "receiver" ? receiverStyle : {}}
      >
        <img
          className="w-12 h-12 rounded-full"
          src={
            messageData.senderImage
              ? "http://localhost:3000/" + messageData.senderImage
              : "https://www.svgrepo.com/show/350417/user-circle.svg"
          }
        />

        <p className={`text-lg ${type === "sender" ? "ml-3" : "mr-3"}`}>
          {messageData.message}
        </p>
      </div>
    </div>
  );
}
