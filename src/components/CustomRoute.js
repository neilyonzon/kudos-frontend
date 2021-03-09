import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn, setAcsToken } from '../utils/auth'

const CustomRoute = ({ component: Component, location, ...rest }) =>{

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null)

    useEffect(() => {
        async function getLoginStatus(){
            const loggedIn = await isLoggedIn()
            setIsUserLoggedIn(loggedIn)
        }
        getLoginStatus()
    }, [])

    // if user goes to protected route but isn't logged in, go to home page (which is the login page)
    if(!isUserLoggedIn && location.pathname !== '/'){
        navigate('/')
        return null
    }

    // if user goes to home page but is logged in, go straight to dashboard
    if(isUserLoggedIn && location.pathname === '/'){
        navigate('/dashboard')
        return null
    }

    return <Component {...rest} />
}

export default CustomRoute;