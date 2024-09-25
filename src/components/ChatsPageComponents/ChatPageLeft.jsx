import UserViewChats from "./UserViewChats";

export default function ChatPageLeft({ color, chatWith, currentUserId }) {
  return (
    <div
      className="basis-3/12 mr-1"
      style={{
        backgroundColor: color.hardColor,
        borderTopRightRadius: "18px",
      }}
    >
      {chatWith.length === 0 ? (
        <p>No users recently chat with</p>
      ) : (
        <div className="flex flex-col items-center pt-4">
          <p className="text-lg pb-3">Recent chats</p>
          {chatWith.map((userData) => (
            <UserViewChats
              key={userData.id}
              currentUserId={currentUserId}
              userData={userData}
              color={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
