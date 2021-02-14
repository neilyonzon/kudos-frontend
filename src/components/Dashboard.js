import React, { Component } from "react";
import { logout, getToken } from "../utils/auth";
import { navigate } from "gatsby";

import ControlPanel from "./dashboard/ControlPanel";
import ClassSelector from "./dashboard/ClassSelector";

import Home from "./Home";
import Students from "./Students";
import TreasureBox from "./TreasureBox";

import dashboardStyles from "./dashboard.module.css";

class Dashboard extends Component {
  state = {
    loading: true,
    selectedComponentName: "",
    dashboardData: null,
    selectedClass: "",
  };

  async componentDidMount() {
    const graphqlQuery = {
      query: `
            {
                teacher{
                    firstName
                    lastName
                    email
                    classes{
                        classId
                        className
                        treasureBoxOpen
                        students{
                            studentId
                            firstName
                            lastName
                            username
                            imageUrl
                            favoriteSubject
                            kudosBalance
                            transactions{
                                prizeId
                                approved
                            }
                        }
                        prizes{
                            prizeId
                            name
                            imageUrl
                            kudosCost
                            quantity
                        }
                    }
                  }
            }
          `,
    };

    const token = getToken();
    const response = await fetch(
      "https://kudos-backend.herokuapp.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(graphqlQuery),
      }
    );

    const responseData = await response.json();
    // this will throw an error if classes[0] does not exist
    const selectedClass =
      (await responseData.data.teacher.classes[0].className) || "";

    this.setState({
      dashboardData: responseData,
      selectedComponentName: "Home",
      selectedClass: selectedClass,
      loading: false,
    });
  }

  onComponentSelectHandler = (selectedComponentName) => {
    this.setState({ selectedComponentName: selectedComponentName });
  };

  onSelectClassHandler = (event) => [
    this.setState({ selectedClass: event.target.value }),
  ];

  render() {
    console.log("dashboard data below");
    console.log(this.state.dashboardData);

    let selectedComponent = null;
    let selectedClassData;
    if (this.state.selectedClass) {
      selectedClassData = this.state.dashboardData.data.teacher.classes.filter(
        (selectedClass) => {
          return selectedClass.className === this.state.selectedClass;
        }
      )[0];
    }
    if (
      this.state.selectedComponentName === "Home" &&
      this.state.selectedClass
    ) {
      selectedComponent = <Home data={selectedClassData} />;
    }
    if (
      this.state.selectedComponentName === "Students" &&
      this.state.selectedClass
    ) {
      selectedComponent = <Students />;
    }
    if (
      this.state.selectedComponentName === "TreasureBox" &&
      this.state.selectedClass
    ) {
      selectedComponent = <TreasureBox />;
    }

    return (
      <div>
        <h1>This is the dashboard page!</h1>

        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            logout(() => navigate("/"));
          }}
        >
          Log Out!
        </a>

        <ControlPanel
          onSelectHandler={this.onComponentSelectHandler}
          selectedComponent={this.state.selectedComponentName}
        />

        {this.state.selectedClass ? (
          <ClassSelector
            onSelect={this.onSelectClassHandler}
            classes={this.state.dashboardData.data.teacher.classes}
          />
        ) : null}

        <h1>Below is the selected component</h1>
        {this.state.selectedClass ? (
          <h2>{this.state.selectedClass} is selected</h2>
        ) : (
          <h2>You don't have any classes!</h2>
        )}

        {selectedComponent}
      </div>
    );
  }
}

export default Dashboard;
