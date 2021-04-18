import React, { Component } from "react";
import { navigate } from "gatsby";
import { loginSuccessful, isLoggedIn } from "../../utils/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginError: false,
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loggedIn = await loginSuccessful(this.state);
    if (loggedIn) {
      return navigate("/dashboard");
    } else {
      this.setState({ loginError: true });
    }
  };

  render() {
    let display;
    if (!this.state.loginError) {
      display = (
        <div>
          <h1>Login</h1>
          <form
            method="POST"
            onSubmit={async (event) => {
              await this.loginSubmitHandler(event);
            }}
          >
            <label>
              Username
              <input
                type="text"
                name="username"
                onChange={(event) => this.inputChangeHandler(event)}
                value={this.state.username}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={(event) => this.inputChangeHandler(event)}
                value={this.state.password}
              />
            </label>
            <input type="submit" value="Log In!" />
            <p>
              <a href="#">Forgot Password?</a>
            </p>
            <p>
              <a href="#">Sign Up</a>
            </p>
          </form>
        </div>
      );
    } else {
      display = (
        <div>
          <h1>An error occurred...</h1>
        </div>
      );
    }

    return <div>{display}</div>;
  }
}

export default Login;
