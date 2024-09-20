import { Route, Routes } from "react-router-dom";
import Home from "./components/homepage/Home";
import LogIn from "./components/userpage/LogIn";
import SignUp from "./components/userpage/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hide } from "./store/clickSlice";
import EventPage from "./components/eventsComponents/EventPage";
import { useSelector } from "react-redux";
import UpdateUser from "./components/userpage/UpdateUser";
import ChatAppPage from "./components/Features/ChatAppPage";
import EventCreation from "./components/Features/EventCreation";
import AdminPage from "./components/Features/AdminPage";
import UpdateEvent from "./components/eventsComponents/UpdateEvent";
import ThemeColor from "./components/AdminPage/ThemeColor";
import AdminLayout from "./components/AdminPage/AdminLayout";
import AllUsers from "./components/AdminPage/AllUsers";
import PageNotFound from "./components/PageNotFound";
import UserPageAdminView from "./components/AdminPage/UserPageAdminView";

function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.themeColor.color);

  useEffect(() => {
    const handleClick = () => {
      dispatch(hide());
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div style={{ color: color.color === "black" ? "white" : "black" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/updateEvent/:id" element={<UpdateEvent />} />
        <Route path="/chat" element={<ChatAppPage />} />
        <Route path="/newEvent" element={<EventCreation />} />
        <Route path="/admin" element={<AdminLayout color={color} />}>
          <Route index element={<AdminPage color={color} />} />
          <Route
            path="/admin/addThemeColor"
            element={<ThemeColor color={color} />}
          />
          <Route path="/admin/viewUsers" element={<AllUsers color={color} />} />
          <Route
            path="/admin/userPage/:id"
            element={<UserPageAdminView color={color} />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
