import React, { Component } from 'react'
import { logout, getToken } from '../utils/auth'
import { navigate } from 'gatsby'

import Home from './Home'
import Students from './Students'
import TreasureBox from './TreasureBox'

import dashboardStyles from './dashboard.module.css'

import { SidebarIconsData } from './dashboard/SidebarIconsData'

class Dashboard extends Component {

    state = {
        loading: true,
        selectedComponentName: '',
        dashboardData: null,
        selectedClass: ''
    }

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

        const token = getToken();
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(graphqlQuery)
        })

        const responseData = await response.json();
        const selectedClass = await responseData.data.teacher.classes[0].className || ''

        this.setState({ dashboardData: responseData, selectedComponentName: 'Home', selectedClass: selectedClass, loading: false })

    }

    onComponentSelectHandler = (selectedComponentName) =>{
        this.setState({selectedComponentName: selectedComponentName})
    }

    render(){

        console.log('dashboard data below')
        console.log(this.state.dashboardData)

        let selectedComponent = null
        let selectedClassData
        if(this.state.selectedClass){
            selectedClassData = this.state.dashboardData.data.teacher.classes.filter(selectedClass => {
                return selectedClass.className === this.state.selectedClass})[0]
        }
        if(this.state.selectedComponentName === 'Home' && this.state.selectedClass){
            selectedComponent = <Home data={selectedClassData}/>
        }
        if(this.state.selectedComponentName === 'Students' && this.state.selectedClass){
            selectedComponent = <Students />
        }
        if(this.state.selectedComponentName === 'TreasureBox' && this.state.selectedClass){
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
                {this.state.selectedClass ? <h2>{this.state.selectedClass} is selected</h2> : <h2>You don't have any classes!</h2>}

                {selectedComponent}

            </div>

        )
    }
}

export default Dashboard;