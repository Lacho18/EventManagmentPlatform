import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../../store/userSlice";
import { toggleWindow, changeColor } from "../../../store/themeColorSlice";

import { Link } from "react-router-dom";

export default function OptionsWindow({ userData }) {
  const dispatch = useDispatch();
  const themeColorsData = useSelector((state) => state.themeColor);

  function changeThemeColor(event, selectedOption) {
    dispatch(changeColor({ selection: selectedOption }));
  }

  return (
    <div className="absolute z-40 text-xl flex flex-col justify-between h-auto user-side-nav">
      {Object.keys(userData).length !== 0 ? (
        <div className="flex flex-col nav-user-window">
          <button onClick={() => dispatch(logOut())}>Log out</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleWindow());
            }}
          >
            Theme color
          </button>
          {themeColorsData.sideWindow && (
            <div className="absolute top-16 left-full ml-4 bg-gray-300 flex">
              {themeColorsData.options.map((option) => (
                <button
                  key={option.color}
                  onClick={(e) => changeThemeColor(e, option.color)}
                  style={{
                    width: "18px",
                    height: "18px",
                    backgroundColor: `${option.color}`,
                  }}
                ></button>
              ))}
            </div>
          )}
          <Link to="/updateUser">Update profile</Link>
          <button>View chats</button>
        </div>
      ) : (
        <div className="flex flex-col nav-user-window">
          <Link to="/logIn">Log in</Link>
          <Link to="/signUp">Sign up</Link>
        </div>
      )}
    </div>
  );
}
