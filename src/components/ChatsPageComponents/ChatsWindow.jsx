import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setError, nullError } from "../../store/errorSlice";
import MessageView from "./MessageView";
import { sendMessage } from "../../webSocket";
import {
  addChatWith,
  clearCurrentMessages,
  setCurrentChatMessages,
} from "../../store/chatsSlice";
import { setsUserChats } from "../../store/userSlice";

export default function ChatsWindow({ color }) {
  const dispatch = useDispatch();
  const { senderId, receiverId } = useParams();
  const allMessages = useSelector((state) => state.chats.currentChatMessages);
  //Reversing the array and visualizing all data on reverse
  const allMessagesCopy = [...allMessages].reverse();
  //Current message that is writing
  const [currentMessage, setCurrentMessage] = useState("");
  //Using references to store data about the receiver image and name
  const receiverMessagesName = useRef("");
  const receiverImage = useRef("");
  const error = useSelector((state) => state.error.errorMessage);

  useEffect(() => {
    if (allMessages.length > 0) {
      dispatch(clearCurrentMessages());
    }
    async function getMessages() {
      const result = await useFetch("chats", "GET", { senderId, receiverId });
      console.log(result.data);

      //Setting the name of the receiver of the messages
      receiverMessagesName.current = result.data.receiverName;
      //Setting the image of the receiver of the messages
      receiverImage.current = result.data.receiverImage;

      if (result.status === 200) {
        //setAllMessages(result.data.messages);
        dispatch(setCurrentChatMessages({ messages: result.data.messages }));
      } else {
        dispatch(setError(result.data.message));
        setTimeout(() => dispatch(nullError()), 3000);
      }
    }

    //setAllMessages([]);
    getMessages();
  }, [receiverId]);

  async function handleMessageSend() {
    const messageStructure = {
      senderId,
      receiverId,
      message: currentMessage,
      time_of_send: new Date(),
    };

    //Adds receiver id to the array of recent chats in order to send the new chat on left component
    dispatch(addChatWith({ newChat: receiverId }));
    //Clears the input tag after sending message
    setCurrentMessage("");
    const postMessage = await useFetch("chats", "POST", messageStructure);
    //Sends the message to the backend with the websocket
    sendMessage(messageStructure);
    dispatch(setsUserChats({ userChats: postMessage.data.userChats }));
  }

  if (receiverMessagesName.current === "") return <div>Loading....</div>;
  return (
    <div
      className="basis-6/12 mr-1 flex justify-center h-full"
      style={{
        backgroundColor: color.heavyColor,
        borderTopRightRadius: "18px",
        borderTopLeftRadius: "18px",
      }}
    >
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
            src={
              receiverImage.current !== ""
                ? "http://localhost:3000/" + receiverImage.current
                : "https://www.svgrepo.com/show/350417/user-circle.svg"
            }
          />
          <p className="text-xl pl-5">{receiverMessagesName.current}</p>
        </div>

        <div className="basis-9/12" style={{ height: "75%" }}>
          <div className="flex flex-col-reverse h-full overflow-y-auto">
            {error !== "" && (
              <p className="text-xl font-bold text-red-500">{error}</p>
            )}
            {allMessagesCopy.map((message) => (
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
            className="h-full w-11/12 rounded-3xl p-2 pr-8 basis-9/12"
            type="text"
            placeholder="Enter message"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <div className="basis-3/12 flex justify-between pl-3 pr-3">
            <button
              className="text-3xl font-bold p-3 w14 h-14 rounded-full"
              style={{ backgroundColor: color.easyColor }}
              onClick={() => {
                setCurrentMessage("");
              }}
            >
              X
            </button>
            <button
              className="ml-5 mr-5 text-3xl bg-blue-600 rounded-full w-14 h-14 flex justify-center items-center"
              onClick={handleMessageSend}
            >
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
