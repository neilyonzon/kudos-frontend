import React from "react";
import { Link } from "gatsby";
import Placeholder from "../../images/profile-image-placeholder.png";

class ProfileIcon extends React.Component {
  state = {
    displayProfile: " ",
  };

  // Neil: How to make 'detect click outside element' a universal/helper function accessible for all components?

  componentDidMount() {
    document.addEventListener("mousedown", this.hideProfileNav);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideProfileNav);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  hideProfileNav = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.displayProfile == " header-profile__nav--visible") {
        this.setState({
          displayProfile: " ",
        });
      }
    }
  };

  toggleProfileNav = () => {
    this.state.displayProfile === " header-profile__nav--visible"
      ? this.setState({ displayProfile: "" })
      : this.setState({ displayProfile: " header-profile__nav--visible" });
  };

  render() {
    return (
      //Neil Notes:
      // 1. API call to display image. Use placeholder if no image.
      // 2. Logout to Expire authentication and redirect to Login | Sign-Up Home Page View.
      // 3. Profile to route to profile page. Profile design/page tbd.
      <div className="header-profile" ref={this.setWrapperRef}>
        <div
          className="header-profile__img-container"
          onClick={this.toggleProfileNav}
        >
          <img
            src={Placeholder}
            className="header-profile__img"
            alt="placeholder"
          ></img>
        </div>
        <ul className={"header-profile__nav" + this.state.displayProfile}>
          <li className="header-profile__nav-item">
            <Link activeClassName="header-profile__nav-link" to="/about">
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
