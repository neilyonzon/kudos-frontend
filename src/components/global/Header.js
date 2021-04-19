import React from "react";
import Logo from "../Logo";
import ProfileIcon from "./Profile";
import { loginSuccesssful, isLoggedIn } from "../../utils/auth";

const Header = () => {
  return (
    <header className="main-header">
      <Logo addclassName=" main-header__logo"></Logo>
      {/* Conditionally render below after authorization/User exists */}

      {/* {(() => {
        if (isLoggedIn() === true) {
          console.log("work");
          return <ProfileIcon />;
        }
      })()} */}
    </header>
  );
};

export default Header;
