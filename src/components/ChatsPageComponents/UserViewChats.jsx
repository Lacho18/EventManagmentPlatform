import { useNavigate } from "react-router";
import "./UserViewChats.css";

export default function UserViewChats({ currentUserId, userData, color }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between m-3 p-3 w-7/12 rounded-md main-user-view-chat"
      style={{
        backgroundColor: color.heavyColor,
        border: "3px solid black",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/chat/${currentUserId}/${userData.id}`)}
    >
      <img
        className="w-14 h-14 rounded-full"
        src={
          userData.userImage
            ? "http://localhost:3000/" + userData.userImage
            : "https://www.svgrepo.com/show/350417/user-circle.svg"
        }
        alt="Image not found!"
      />
      <div className="flex flex-col items-center">
        <p className="text-sm italic opacity-50 self-end">{userData.role}</p>
        <p className="text-lg -m-2">
          {userData.firstName} {userData.lastName}
        </p>
      </div>
    </div>
  );
}
