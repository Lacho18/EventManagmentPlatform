import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AdminPage() {
  const navigate = useNavigate();
  const color = useSelector((state) => state.themeColor.color);
  const userData = useSelector((state) => state.user.userData);
  const userHasLoggedIn = useSelector((state) => state.user.hasLoggedIn);

  /*
    1. Dovurshi stranicata na administratora
  */

  if (!userHasLoggedIn) {
    setTimeout(() => navigate("/"), 3000);
    return (
      <div
        className="w-screen h-screen flex justify-center items-center font-bold text-3xl text-red-500"
        style={{ backgroundColor: color.hardColor }}
      >
        You should log in inside your admin account to access this page!
      </div>
    );
  }

  if (userData.role !== "admin") {
    setTimeout(() => navigate("/"), 3000);
    return (
      <div
        className="w-screen h-screen flex justify-center items-center font-bold text-3xl text-red-500"
        style={{ backgroundColor: color.hardColor }}
      >
        You does not have access to this page!
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: color.hardColor }}
    >
      <div
        className="w-3/5 h-2/3 rounded-3xl flex flex-col items-center"
        style={{
          backgroundColor: color.lightColor,
          border: "7px solid " + color.color,
        }}
      >
        <p className="text-3xl gap-1/3">
          Welcome{" "}
          <span className="font-bold">
            {userData.firstName} {userData.lastName}
          </span>
        </p>
        <div className="border-4 border-black gap-2/3">
          <button>Add theme color</button>
          <button>View users profiles</button>
        </div>
      </div>
    </div>
  );
}
