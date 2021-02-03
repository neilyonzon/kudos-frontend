import React, { Component } from 'react'
import { logout } from '../utils/auth'
import { navigate } from 'gatsby'

import { FaAward } from '@react-icons/all-files/fa/FaAward'
import { IoIosHome } from '@react-icons/all-files/io/IoIosHome'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings'

class Dashboard extends Component {
    render(){
        return (
            <div>
                <h1>This is the dashboard page!</h1>

                <IoIosHome />
                <IoIosPeople />
                <FaAward />
                <IoIosSettings />

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