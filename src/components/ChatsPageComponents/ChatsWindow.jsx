import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setError, nullError } from "../../store/errorSlice";
import MessageView from "./MessageView";

export default function ChatsWindow({ color }) {
  const dispatch = useDispatch();
  const { senderId, receiverId } = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const error = useSelector((state) => state.error.errorMessage);

  useEffect(() => {
    async function getMessages() {
      const result = await useFetch("chats", "GET", { senderId, receiverId });
      console.log(result.data.messages);
      result.data.messages.forEach((message) => {
        console.log(senderId);
        console.log(message.senderId);
        console.log(senderId == message.senderId);
      });

      if (result.status === 200) {
        setAllMessages(result.data.messages);
      } else {
        dispatch(setError(result.data.message));
        setTimeout(() => dispatch(nullError()), 3000);
      }
    }

    getMessages();
  }, []);

  if (allMessages.length === 0) return <div>Loading....</div>;
  return (
    <div
      className="basis-6/12 mr-1 flex justify-center h-full"
      style={{
        backgroundColor: color.heavyColor,
        borderTopRightRadius: "18px",
        borderTopLeftRadius: "18px",
      }}
    >
      {error !== "" && (
        <p className="text-xl font-bold text-red-500">{error}</p>
      )}
      <div
        className="w-11/12 h-11/12 border-black border-8 border-b-0 flex flex-col"
        style={{ borderTopLeftRadius: "18px", borderTopRightRadius: "18px" }}
      >
        <div
          className="basis-2/12 flex items-center p-3"
          style={{
            backgroundColor: color.lightColor,
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            borderBottom: "1px solid black",
          }}
        >
          <img
            className="w-16 h-16 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s"
          />
          <p className="text-xl pl-5">Petq Peteva</p>
        </div>

        <div className="basis-9/12" style={{ height: "75%" }}>
          <div className="flex flex-col h-full overflow-y-auto">
            {allMessages.map((message) => (
              <MessageView
                key={message.id}
                messageData={message}
                type={senderId == message.senderId ? "sender" : "receiver"}
                color={color}
              />
            ))}
          </div>
        </div>

        <div className="basis-1/12 h-full flex">
          <input
            className="h-full rounded-3xl p-2"
            type="text"
            placeholder="Enter message"
          />
          <button className="ml-5 mr-5 text-3xl bg-blue-600 rounded-full w-14 h-14 flex justify-center items-center">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}
