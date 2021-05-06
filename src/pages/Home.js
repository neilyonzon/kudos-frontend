import React, { useState, useEffect, Component } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { navigate } from "gatsby";
import { isLoggedIn, logout, getAcsToken } from "../utils/auth";

import ControlNav from "../components/home/ControlNav";
import ClassSelector from "../components/home/ClassSelector";

import Dashboard from "../components/Dashboard";
import Students from "../components/Students";
import TreasureBox from "../components/TreasureBox";
import { AiOutlineLock } from "@react-icons/all-files/ai/AiOutlineLock";
import dashboardStyles from "../components/dashboard.module.css";

const Home = (props) => {
  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await isLoggedIn();
      if (!userLoggedIn) {
        return navigate("/");
      } else {
        setShow(true);
      }
    };

    checkLoginStatus();
  }, []);

  const GET_TEACHER_INFO = gql`
    query getTeacherInfo {
      teacher {
        firstName
        lastName
        email
        classes {
          id
          className
        }
      }
    }
  `;

  const [loadTeacherInfo, { called, loading, data, error }] = useLazyQuery(
    GET_TEACHER_INFO,
    {
      onCompleted({ teacher }) {
        if (teacher && teacher.classes.length > 0) {
          setClasses(teacher.classes);
          setSelectedClassId(teacher.classes[0].id);
        }
      },
    }
  );

  const onTabSelectHandler = (tabName) => {
    setSelectedTab(tabName);
  };

  const onSelectClassHandler = (e) => {
    const selectedClassName = e.target.value;
    const selectedClass = classes.find((cls) => {
      return cls.className === selectedClassName;
    });
    setSelectedClassId(selectedClass.id);
  };

  if (!called && show) {
    loadTeacherInfo();
    return null;
  }

  if (loading) {
    return (
      <div>
        <h1>...Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>...an error happened...</h1>
      </div>
    );
  }

  if (called && !loading) {
    let tabComponent;
    let tabClass;
    switch (true) {
      case selectedTab === "Settings":
        tabComponent = <TreasureBox />;
        tabClass = "dashboard";
        break;
      case !selectedClassId:
        tabComponent = (
          <div>
            <h2>You don't have any classes! Go to settings to add a class</h2>
          </div>
        );
        break;
      case selectedTab === "Students":
        tabComponent = <Students />;
        tabClass = "students";
        break;
      case selectedTab === "TreasureBox":
        tabComponent = <TreasureBox selectedClassId={selectedClassId} />;
        tabClass = "treasurebox";
        break;
      default:
        tabComponent = <Dashboard selectedClassId={selectedClassId} />;
        tabClass = "dashboard";
    }

    return (
      <div className="main">
        <div className="message-banner">
          <h1>Welcome Back Oscar Cano</h1>
        </div>

        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            logout(() => navigate("/"));
          }}
        >
          Log Out!
        </a>

        <ControlNav
          onSelectTab={onTabSelectHandler}
          selectedTab={selectedTab}
        />

        <div className={`control-panel ${tabClass}`}>
          <div className="utility-bar">
            <ClassSelector
              onSelectClass={onSelectClassHandler}
              classes={classes}
            />
            <AiOutlineLock className="treasure-lock" />
          </div>
          {tabComponent}
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
