const isBrowser = () => typeof window !== "undefined";

export const getToken = () => 
    window.localStorage.getItem("userToken") 
        ? window.localStorage.getItem("userToken")
        : '';

const setToken = userToken => (window.localstorage.setItem("userToken", userToken));

export const loginSuccessful = async (username, password) => {
    if(!isBrowser){
        return false;
    }

    const graphqlQuery = {
        query: `
        {
            loginTeacher(teacherInput: {username: "${username}", password:"${password}"}) {
              token
            }
        }
      `
    }

    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    });

    const userData = response.json();
    if(userData.errors){
        return false
    }

    if(userData.data){
        const userToken = userData.data.loginTeacher.token || userData.data.loginStudent.token
        setToken(userToken);
        return true
    }
};

// need to add logic in the future for if token is expired
// also if we want to request another token
export const isLoggedIn = () =>{
    if(!isBrowser){
        return false;
    }

    return !!getToken();
}

export const logout = callback =>{
    setToken('');
    callback();
};