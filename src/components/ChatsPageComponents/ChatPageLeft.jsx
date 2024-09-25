import UserViewChats from "./UserViewChats";

export default function ChatPageLeft({
  color,
  chatWithIds,
  specUsers,
  currentUserId,
}) {
  const prevChatUsers = specUsers.filter((user) =>
    chatWithIds.includes(Number(user.id))
  );

  return (
    <div
      className="basis-3/12 mr-1"
      style={{
        backgroundColor: color.hardColor,
        borderTopRightRadius: "18px",
      }}
    >
      {prevChatUsers.length === 0 ? (
        <p>No users recently chat with</p>
      ) : (
        <div className="flex flex-col items-center pt-4">
          <p className="text-lg pb-3">Recent chats</p>
          {prevChatUsers.map((userData) => (
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
