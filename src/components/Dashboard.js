import React, { Component } from 'react'
import { logout } from '../utils/auth'
import { navigate } from 'gatsby'

import dashboardStyles from './dashboard.module.css'

import { SidebarIconsData } from './dashboard/SidebarIconsData'

class Dashboard extends Component {
    render(){
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
                                <li key={iconData.component} className={dashboardStyles.navText}>
                                    {iconData.icon}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

            </div>

        )
    }
}

export default Dashboard;