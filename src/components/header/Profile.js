import React from "react";
import { Link } from "gatsby";

const ProfileIcon = () => {
  return (
    <div className="header-profile">
      <img
        src="https://via.placeholder.com/150"
        className="header-profile__img"
        alt="placeholder"
      ></img>
      <ul className="header-profile__nav">
        <li className="header-profile__nav-item">
          <Link activeClassName="header-profile__nav-link" to="/">
            Profile
          </Link>
        </li>
        <li className="header-profile__nav-item">
          <a href="#" id="logout">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileIcon;
