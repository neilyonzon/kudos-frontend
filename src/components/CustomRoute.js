import React from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../utils/auth'

const CustomRoute = ({ component: Component, location, ...rest }) =>{

    // if user goes to protected route but isn't logged in, go to home page (which is the login page)
    if(!isLoggedIn() && location.pathname !== '/'){
        navigate('/')
        return null
    }

    // if user goes to home page but is logged in, go straight to dashboard
    if(isLoggedIn() && location.pathname === '/'){
        navigate('/dummy')
        return null
    }

    return <Component {...rest} />
}

export default CustomRoute;