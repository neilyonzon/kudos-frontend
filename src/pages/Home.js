import React, { useState, useEffect, Component } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { navigate } from "gatsby";
import { retrieveAcsToken, logout } from "../utils/auth";
import { getUserType } from "../utils/userType";

import ControlNav from "../components/home/ControlNav";
import ClassSelector from "../components/home/ClassSelector";
import Dashboard from "../components/Dashboard";
import Students from "../components/Students";
import TreasureBox from "../components/TreasureBox";
import Settings from "../components/settings/Settings";
import { AiOutlineLock } from "@react-icons/all-files/ai/AiOutlineLock";
import { AiOutlineUnlock } from "@react-icons/all-files/ai/AiOutlineUnlock";
import dashboardStyles from "../components/dashboard.module.css";

const Home = (props) => {
  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [kudosBalance, setKudosBalance] = useState(0);
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const savedUserType = getUserType();
      const acsToken = await retrieveAcsToken();
      if (!!acsToken) {
        setUserType(savedUserType);
        setShow(true);
      } else {
        const loginDomain = savedUserType ? savedUserType : "";
        return navigate(`/${loginDomain}`);
      }
    };

    checkLoginStatus();
  }, []);

  let GET_USER_INFO;
  if (userType === "teacher") {
    GET_USER_INFO = gql`
      query getTeacherInfo {
        teacher {
          firstName
          lastName
          email
          username
          classes {
            id
            className
            imageUrl
            treasureBoxOpen
          }
          categories {
            id
            category
          }
        }
      }
    `;
  } else {
    GET_USER_INFO = gql`
      query getStudentInfo {
        student {
          firstName
          lastName
          username
          imageUrl
          kudosBalance
          id
        }
      }
    `;
  }

  const [loadUserInfo, { called, loading, error, data }] = useLazyQuery(
    GET_USER_INFO,
    {
      fetchPolicy: "network-only",
      onCompleted(data) {
        if (data && userType === "teacher" && data.teacher.categories.length > 0){
          setCategories(data.teacher.categories)
        }
        if (data && userType === "teacher" && data.teacher.classes.length > 0) {
          setClasses(data.teacher.classes);
          if (!selectedClassId) {
            setSelectedClassId(data.teacher.classes[0].id);
          }
          return;
        }
        if (data && userType !== "teacher") {
          setSelectedClassId(data.student.classId);
          setKudosBalance(data.student.kudosBalance);
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

  const TOGGLE_TREASURE_BOX = gql`
    mutation toggleBox($classId: Int!) {
      toggleTreasureBox(classId: $classId)
    }
  `;

  const [toggleTreasureBox] = useMutation(TOGGLE_TREASURE_BOX, {
    onCompleted() {
      loadUserInfo();
    },
    onError() {
      console.log("error toggling treasure box!");
    },
  });

  const handleToggleTB = async (classId) => {
    toggleTreasureBox({
      variables: {
        classId: classId,
      },
    });
  };

  if (!called && show) {
    loadUserInfo();
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
    console.log(error)
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
        tabComponent = (
          <Settings 
            selectedClassId={selectedClassId} 
            data={data} 
            loadUserInfo={loadUserInfo}
            categories={categories}
          />
        );
        tabClass = "";
        break;
      case !selectedClassId:
        tabComponent = (
          <div>
            <h2>You don't have any classes! Go to settings to add a class</h2>
          </div>
        );
        break;
      case selectedTab === "Students":
        tabComponent = (
          <Students selectedClassId={selectedClassId} userType={userType} />
        );
        tabClass = "students";
        break;
      case selectedTab === "TreasureBox":
        tabComponent = (
          <TreasureBox
            selectedClassId={selectedClassId}
            userType={userType}
            kudosBalance={kudosBalance}
            categories={categories}
          />
        );
        tabClass = "treasurebox";
        break;
      default:
        tabComponent = (
          <Dashboard selectedClassId={selectedClassId} userType={userType} />
        );
        if (userType !== "teacher") {
          tabClass = "dashboard--student";
        } else {
          tabClass = "dashboard";
        }
    }

    let treasureBoxIcon;
    let sortedClasses;
    if (userType === "teacher") {
      sortedClasses = [...classes];
      if (selectedClassId) {
        const selectedClass = classes.find((cls) => {
          return cls.id === selectedClassId;
        });
        if (selectedClass.treasureBoxOpen) {
          treasureBoxIcon = (
            <AiOutlineUnlock
              className="treasure-lock"
              onClick={() => handleToggleTB(selectedClassId)}
            />
          );
        } else {
          treasureBoxIcon = (
            <AiOutlineLock
              className="treasure-lock"
              onClick={() => handleToggleTB(selectedClassId)}
            />
          );
        }

        sortedClasses.forEach((cls, i) => {
          if (cls.id === selectedClassId) {
            sortedClasses.splice(i, 1);
            sortedClasses.unshift(cls);
          }
        });
      }
    }

    return (
      <div className="main">
        <div className="message-banner">
          <h1>
            Welcome Back{" "}
            {userType === "teacher"
              ? `${data.teacher.firstName} ${data.teacher.lastName}!`
              : `${data.student.firstName} ${data.student.lastName}!`}
          </h1>
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
          userType={userType}
        />

        <div className={`control-panel ${tabClass}`}>
          {userType === "teacher" && selectedTab !== "Settings" ? (
            <div className="utility-bar">
              <ClassSelector
                onSelectClass={onSelectClassHandler}
                classes={sortedClasses}
              />
              {treasureBoxIcon}
            </div>
          ) : null}
          {tabComponent}
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
