import React, { Component } from 'react'
import { logout } from '../utils/auth'
import { navigate } from 'gatsby';

class Dummy extends Component {
    render(){
        return (
            <div>
                <h1>This is the dummy page!</h1>
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

export default Dummy;