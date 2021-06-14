const isBrowser = () => typeof window !== "undefined"

export const setUserType = (userType) => {
    if(isBrowser()){
        window.localStorage.setItem('userType', userType)
    }
}

export const getUserType = () => isBrowser() ? window.localStorage.getItem('userType') : ''