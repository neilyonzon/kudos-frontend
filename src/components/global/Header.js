import React, { useState} from "react";
import Logo from "./Logo";
import { navigate } from "gatsby";
import { getUserType } from "../../utils/userType";
import { retrieveAcsToken, setAcsToken } from "../../utils/auth";
import { gql, useMutation } from "@apollo/client";

const Header = (props) => {
  const [userType, setUserType] = useState(null);

  if (props.loginState) {
    const checkLoginStatus = async () => {
      const savedUserType = getUserType();
      const acsToken = await retrieveAcsToken();
      if (!!acsToken) {
        setUserType(savedUserType);
      }
    };
    checkLoginStatus();
  }

  const LOGOUT = gql`
    mutation logout {
      logoutUser {
        userId
      }
    }
  `

  const [logoutUser] = useMutation(LOGOUT, {
    onCompleted() {
      setAcsToken('')
      const loginDomain = userType === "teacher" ? "teacher" : ""
      navigate(`/${loginDomain}`);
      props.updateLoginStatus(false);
    },
    onError() {
      console.log("could not logout user!")
    }
  })

  return (
    <header className="main-header">
      <Logo addclassName="main-header__logo"></Logo>
      <div class="main-header__utility">
        { props.loginState ? <a
            href="/"
            class="btn--link"
            onClick={(event) => {
              event.preventDefault();
              logoutUser()
            }}
          >
            Log out
          </a> : null }
        </div>
    </header>
  );
};

export default Header;
