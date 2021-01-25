import React from "react";
import { Link } from "gatsby";
import Logo from "../Logo";
import ProfileIcon from "./Profile";

const Header = () => {
  return (
    <header className="main-header">
      <Logo addClass=" main-header__logo"></Logo>

      {/* Conditionally render below if authorized/profile exists */}
      <ProfileIcon></ProfileIcon>
    </header>
  );
};

export default Header;
