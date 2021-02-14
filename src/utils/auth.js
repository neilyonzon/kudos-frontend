const isBrowser = () => typeof window !== "undefined";

export const getToken = () =>
  isBrowser() && window.localStorage.getItem("userToken")
    ? window.localStorage.getItem("userToken")
    : "";

const setToken = (userToken) =>
  window.localStorage.setItem("userToken", userToken);

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

  const response = await fetch("https://kudos-backend.herokuapp.com/graphql", {
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
    setToken(userToken);
    return true;
  }
};

// need to add logic in the future for if token is expired
// also if we want to request another token
export const isLoggedIn = () => {
  if (!isBrowser) {
    return false;
  }

  return !!getToken();
};

export const logout = (callback) => {
  setToken("");
  callback();
};
