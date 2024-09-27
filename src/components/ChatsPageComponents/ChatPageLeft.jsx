import UserViewChats from "./UserViewChats";

export default function ChatPageLeft({
  color,
  chatWithIds,
  specUsers,
  currentUserId,
}) {
  let prevChatUsers = specUsers.filter((user) =>
    chatWithIds.includes(Number(user.id))
  );

  //Function that sorts the array in a way most recent chat
  function sortByIds(idsArray, objectsArray) {
    let sortedObjectsArray = idsArray.map((id) => {
      let currentObject = objectsArray.find((user) => Number(user.id) === id);

      return currentObject;
    });

    return sortedObjectsArray;
  }

  prevChatUsers = sortByIds(chatWithIds, prevChatUsers);

  return (
    <div
      className="basis-3/12 mr-1 overflow-y-scroll"
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
