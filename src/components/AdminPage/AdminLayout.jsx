import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout({ color }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const userHasLoggedIn = useSelector((state) => state.user.hasLoggedIn);

  //Does not visualize the page for people with not access to it
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
      <Outlet />
    </div>
  );
}
