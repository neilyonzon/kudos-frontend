export const isBrowser = () => typeof window !== "undefined";

export const getUser = () => 
    window.localStorage.getItem("userInfo") 
        ? JSON.parse(window.localStorage.getItem("userInfo"))
        : {}

const setUser = userInfo => (window.localstorage.setItem("userInfo", JSON.stringify(userInfo)));

export const loginUser = ({ username, password }) =>{
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

    let userData;
    fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    }).then(response => {
        return response.json();
    }).then(data =>{
        userData = data;
    }).catch(error => console.log(error));

    if(userData){
        return setUser(userData);
    }

    return false;

}