import React from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) =>{
    if(!isLoggedIn() && location.pathname !== '/'){
        navigate('/')
        return null
    }

    // if user goes to home page but is logged in, go straight to dashboard
    if(isLoggedIn() && location.pathname === '/'){
        navigate('/dashboard')
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute;