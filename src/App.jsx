import { Route, Routes } from "react-router-dom";
import Home from "./components/homepage/Home";
import LogIn from "./components/userpage/LogIn";
import SignUp from "./components/userpage/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hide } from "./store/clickSlice";
import EventPage from "./components/eventsComponents/EventPage";

function App() {
  const dispatch = useDispatch();

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
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
