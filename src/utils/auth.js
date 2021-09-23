import jwt_decode from 'jwt-decode'

let acsToken = "";
export const setAcsToken = (token) =>{
  acsToken = token;
};

export const getAcsToken = () =>{
  return acsToken;
};

export const retrieveAcsToken = async () => {

  // access token might not exist in memory if user switched tabs, refreshed page, has never logged in, or access token is expired
  // try to get new access token with refresh token cookie but if refresh token is not valid, setAcsToken will set access token to ""
  // and !!getAcsToken() will return false, else refresh token valid and !!getAcsToken() will return true

  const acsToken = getAcsToken();
  let newAcsToken;
  if(!acsToken){
    newAcsToken = await refreshToken()
    setAcsToken(newAcsToken)
  } else {
    // console.log(acsToken)
    const { exp } = jwt_decode(acsToken)
    if(Date.now() >= exp * 1000){
      newAcsToken = await refreshToken()
      setAcsToken(newAcsToken)
    }
  }

  return getAcsToken();
};

// returns valid access token if refresh token cookie is valid
// else returns empty string if refresh token is not valid
const refreshToken = async () =>{

  const response = await fetch("https://kudos-backend.herokuapp.com/refresh_token", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  });

  const resData = await response.json()
  const newAcsToken = await resData.accessToken
  return newAcsToken

}