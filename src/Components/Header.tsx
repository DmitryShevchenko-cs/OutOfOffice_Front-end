import React from "react";
import NavigateButtons from "./HeaderComponents/NavigateButtons";
import style from "../scss/layout.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLogOutMutation } from "../services/authService";
import { useActions } from "../Hooks/storeHook";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const { userLogout } = useActions();
  
  const handleLogout = async () => {
    try {
      console.log("Logout successful");
      userLogout();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <div className={style.headerContent}>
        {isAuthenticated ? <NavigateButtons/> : null}
        {isAuthenticated && (
          <button className={style.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
