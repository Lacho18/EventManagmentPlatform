import { IoSend } from "react-icons/io5";
import { useParams } from "react-router";

export default function ChatsWindow({ color }) {
  const { senderId, receiverId } = useParams();
  return (
    <div
      className="basis-6/12 mr-1 flex justify-center"
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
          }}
        >
          <img
            className="w-16 h-16 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s"
          />
          <p className="text-xl pl-5">Petq Peteva</p>
        </div>

        <div className="basis-9/12"></div>
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
