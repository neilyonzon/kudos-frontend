import React from "react";
import Logo from "../Logo";
import ProfileIcon from "./Profile";

const Header = () => {
  return (
    <header className="main-header">
      <Logo addclassName=" main-header__logo"></Logo>
      {/* Conditionally render below after authorization/User exists */}
      <ProfileIcon></ProfileIcon>
    </header>
  );
};

export default Header;
