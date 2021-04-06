import React, { useState, useEffect, Component } from "react";
import { gql, useLazyQuery } from '@apollo/client'
import { navigate } from "gatsby";
import { isLoggedIn, logout, getAcsToken } from "../utils/auth";

import ControlPanel from "./dashboard/ControlPanel";
import ClassSelector from "./dashboard/ClassSelector";

import Home from "./Home";
import Students from "./Students";
import TreasureBox from "./TreasureBox";

import dashboardStyles from "./dashboard.module.css";

const Dashboard = props =>{

  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [classes, setClasses] = useState([])
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(async () =>{
    const userLoggedIn = await isLoggedIn()
    if(!userLoggedIn){
      return navigate('/')
    } else{
      setShow(true)
    }
  }, [])

  const GET_TEACHER_INFO = gql`
    query getTeacherInfo{
      teacher{
        firstName
        lastName
        email
        classes{
            classId
            className
        }
      }
    }
  `

  const [loadTeacherInfo, { called, loading, data, error }] = useLazyQuery(GET_TEACHER_INFO, 
    {
      onCompleted({ teacher }){
        if(teacher && teacher.classes.length > 0){
          setClasses(teacher.classes)
          setSelectedClassId(teacher.classes[0].classId)
        }
      }
    }
  )

  const onTabSelectHandler = (tabName) =>{
    setSelectedTab(tabName)
  }

  const onSelectClassHandler = (e) =>{
    const selectedClassName = e.target.value
    const selectedClass = classes.find(cls =>{
      return cls.className = selectedClassName
    })
    setSelectedClassId(selectedClass.classId)
  }

  if(!called && show){
    loadTeacherInfo()
    return null
  }

  if(loading){
    return (
      <div>
        <h1>...Loading...</h1>
      </div>
    )
  }

  // if(error){

  // }

  if(called && !loading){

    let tabComponent
    switch(selectedTab){
      case 'Students':
        tabComponent = <Students />
      case 'TreasureBox':
        tabComponent = <TreasureBox />
      case 'Settings':
        tabComponent = <TreasureBox />
      default:
        tabComponent = <Home />
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
          onSelectHandler={onTabSelectHandler}
          selectedComponent={selectedTab}
        />

        <ClassSelector
          onSelect={onSelectClassHandler}
          classes={classes}
        />

        <h1>Below is the selected tab</h1>
        {/* {}

        }

        {this.state.selectedClass ? (
          <h2>{this.state.selectedClass} is selected</h2>
        ) : (
          <h2>You don't have any classes!</h2>
        )}

        {selectedComponent} */}
      </div>
    )
  }

  return null
}

// class Dashboard extends Component {
//   state = {
//     loading: true,
//     selectedComponentName: "",
//     dashboardData: null,
//     selectedClass: "",
//   };

//   async componentDidMount() {
//     const userLoggedIn = await isLoggedIn()
//     if(!userLoggedIn){
//       return navigate('/')
//     }


//     const graphqlQuery = {
//       query: `
//             query {
                
//             }
//           `,
//     };

//     const token = getAcsToken();
//     const response = await fetch(
//       "https://kudos-backend.herokuapp.com/graphql",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(graphqlQuery),
//       }
//     );

//     const responseData = await response.json();
//     // this will throw an error if classes[0] does not exist
//     const selectedClass =
//       (await responseData.data.teacher.classes[0].className) || "";

//     this.setState({
//       dashboardData: responseData,
//       selectedComponentName: "Home",
//       selectedClass: selectedClass,
//       loading: false,
//     });
//   }

//   onComponentSelectHandler = (selectedComponentName) => {
//     this.setState({ selectedComponentName: selectedComponentName });
//   };

//   onSelectClassHandler = (event) => [
//     this.setState({ selectedClass: event.target.value }),
//   ];

//   render() {
//     console.log("dashboard data below");
//     console.log(this.state.dashboardData);

//     let selectedComponent = null;
//     let selectedClassData;
//     if (this.state.selectedClass) {
//       selectedClassData = this.state.dashboardData.data.teacher.classes.filter(
//         (selectedClass) => {
//           return selectedClass.className === this.state.selectedClass;
//         }
//       )[0];
//     }
//     if (
//       this.state.selectedComponentName === "Home" &&
//       this.state.selectedClass
//     ) {
//       selectedComponent = <Home data={selectedClassData} />;
//     }
//     if (
//       this.state.selectedComponentName === "Students" &&
//       this.state.selectedClass
//     ) {
//       selectedComponent = <Students />;
//     }
//     if (
//       this.state.selectedComponentName === "TreasureBox" &&
//       this.state.selectedClass
//     ) {
//       selectedComponent = <TreasureBox data={selectedClassData}/>;
//     }

//     return (
//       <div>
//         <h1>This is the dashboard page!</h1>

//         <a
//           href="/"
//           onClick={(event) => {
//             event.preventDefault();
//             logout(() => navigate("/"));
//           }}
//         >
//           Log Out!
//         </a>

//         <ControlPanel
//           onSelectHandler={this.onComponentSelectHandler}
//           selectedComponent={this.state.selectedComponentName}
//         />

//         {this.state.selectedClass ? (
//           <ClassSelector
//             onSelect={this.onSelectClassHandler}
//             classes={this.state.dashboardData.data.teacher.classes}
//           />
//         ) : null}

//         <h1>Below is the selected component</h1>
//         {this.state.selectedClass ? (
//           <h2>{this.state.selectedClass} is selected</h2>
//         ) : (
//           <h2>You don't have any classes!</h2>
//         )}

//         {selectedComponent}
//       </div>
//     );
//   }
// }

export default Dashboard;
