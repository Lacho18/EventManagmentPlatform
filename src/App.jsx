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
        <Route path="/chat" element={<ChatAppPage />} />
        <Route path="/newEvent" element={<EventCreation />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
