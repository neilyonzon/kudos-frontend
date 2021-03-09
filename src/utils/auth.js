const jwt_decode = require('jwt-decode');

let acsToken = "";

export const setAcsToken = (token) =>{
  acsToken = token;
};

export const getAcsToken = () =>{
  return acsToken;
};


const isBrowser = () => typeof window !== "undefined";

// export const getToken = () =>
//   isBrowser() && window.localStorage.getItem("userToken")
//     ? window.localStorage.getItem("userToken")
//     : "";

// const setToken = (userToken) =>
//   window.localStorage.setItem("userToken", userToken);

export const loginSuccessful = async ({ username, password }) => {
  if (!isBrowser) {
    return false;
  }

  const graphqlQuery = {
    query: `
        {
            loginTeacher(teacherInput: {username: "${username}", password:"${password}"}) {
              token
            }
        }
      `,
  };

  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  //need to refactor so it provides error message so it can be displayed in client if login fails
  const userData = await response.json();
  if (userData.errors) {
    return false;
  }

  if (userData) {
    const userToken =
      userData.data.loginTeacher.token || userData.data.loginStudent.token;
    setAcsToken(userToken);
    return true;
  }
};

export const isLoggedIn = async () => {
  if (!isBrowser) {
    return false;
  }

  const acsToken = getAcsToken();
  let newAcsToken;
  // access token might not exist in memory if user switched tabs, refreshed page, has never logged in, or access token is expired
  // try to get new access token with refresh token cookie but if refresh token is not valid, setAcsToken will set access token to ""
  // and !!getAcsToken() will return false, else refresh token valid and !!getAcsToken() will return true
  if(!acsToken){
    newAcsToken = refreshToken()
    setAcsToken(newAcsToken)
  } else {
    const { exp } = jwt_decode(acsToken)
    if(Date.now() >= exp * 1000){
      newAcsToken = await refreshToken()
      setAcsToken(newAcsToken)
    }
  }

  return !!getAcsToken();
};

export const logout = (callback) => {
  setAcsToken("");
  callback();
};

// returns valid access token if refresh token cookie is valid
// else returns empty string if refresh token is not valid
const refreshToken = async () =>{

  const response = await fetch("http://localhost:3000/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const resData = await response.json()
  const newAcsToken = await resData.accessToken
  return newAcsToken

}