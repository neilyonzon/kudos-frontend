import React from "react";
import { Link } from "gatsby";

class ProfileIcon extends React.Component {
  state = {
    displayProfile: " header-profile__nav--hide",
  };

  toggleProfileNav = () => {
    this.state.displayProfile === " header-profile__nav--hide"
      ? this.setState({ displayProfile: "" })
      : this.setState({ displayProfile: " header-profile__nav--hide" });
  };

  render() {
    return (
      <div className="header-profile">
        <img
          src="https://via.placeholder.com/150"
          className="header-profile__img"
          alt="placeholder"
          onClick={this.toggleProfileNav}
        ></img>
        <ul className={"header-profile__nav" + this.state.displayProfile}>
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
  }
}

export default ProfileIcon;
