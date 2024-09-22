export default function ChatPageLeft({ color }) {
  return (
    <div
      className="basis-3/12 mr-1"
      style={{ backgroundColor: color.hardColor, borderTopRightRadius: "18px" }}
    >
      <p>No users recently chat with</p>
    </div>
  );
}
