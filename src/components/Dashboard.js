import React, { Component } from 'react'
import { logout } from '../utils/auth'
import { navigate } from 'gatsby'

import { SidebarIconsData } from './dashboard/SidebarIconsData'

class Dashboard extends Component {
    render(){
        return (
            <div>
                <h1>This is the dashboard page!</h1>

                <nav>
                    <ul>
                        {SidebarIconsData.map(iconData =>{
                            return (
                                <li key={iconData.component}>
                                    {iconData.icon}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <a
                    href="/"
                    onClick={event =>{
                        event.preventDefault();
                        logout(() => navigate('/'))
                    }}
                >
                    Log Out!
                </a>
            </div>

        )
    }
}

export default Dashboard;