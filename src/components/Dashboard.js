import React, { Component } from 'react'
import { logout } from '../utils/auth'
import { navigate } from 'gatsby'

import Home from './Home'
import Students from './Students'
import TreasureBox from './TreasureBox'

import dashboardStyles from './dashboard.module.css'

import { SidebarIconsData } from './dashboard/SidebarIconsData'

class Dashboard extends Component {

    state = {
        selectedComponentName: 'Home',
        dashboardData: {},
        selectedClass: ''
    }

    componentDidMount() {

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
          `
        }

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' 
            },
            body: JSON.stringify(graphqlQuery)
        });

        const data = await response.json();
        this.setState({dashboardData: data});
    }

    onComponentSelectHandler = (selectedComponentName) =>{
        this.setState({selectedComponentName: selectedComponentName})
    }

    render(){

        let selectedComponent
        if(this.state.selectedComponentName === 'Home'){
            selectedComponent = <Home />
        }
        if(this.state.selectedComponentName === 'Students'){
            selectedComponent = <Students />
        }
        if(this.state.selectedComponentName === 'TreasureBox'){
            selectedComponent = <TreasureBox />
        }

        return (
            <div>
                <h1>This is the dashboard page!</h1>

                <a
                    href="/"
                    onClick={event =>{
                        event.preventDefault();
                        logout(() => navigate('/'))
                    }}
                >
                    Log Out!
                </a>

                <nav className={dashboardStyles.navMenu}>
                    <ul className={dashboardStyles.navMenuItems}>
                        {SidebarIconsData.map(iconData =>{
                            return (
                                <li 
                                    key={iconData.component} 
                                    className={dashboardStyles.navText}
                                    onClick={() => this.onComponentSelectHandler(iconData.component)}>
                                    {iconData.icon}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <h1>Below is the selected component</h1>

                {selectedComponent}

            </div>

        )
    }
}

export default Dashboard;