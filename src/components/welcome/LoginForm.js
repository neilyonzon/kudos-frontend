import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { navigate } from "gatsby";

import Input from "../forms/Input";
import Button from "../elements/Button";
import { setAcsToken } from "../../utils/auth";
import { setUserType } from "../../utils/userType";

const Login = ({ teacherLogin }) => {
  const [loginError, setLoginError] = useState(false);
  const [form, setForm] = useState({
    username: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "Username",
      },
      config: {
        type: "text",
        placeholder: "Username",
      },
      helper: "Username",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "Password",
      },
      config: {
        type: "password",
        placeholder: "Password",
      },
      helper: "",
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...form };
    const updatedFormInput = { ...updatedForm[inputIdentifier] };
    updatedFormInput.value = event.target.value;
    updatedFormInput.valid = checkValidity(
      updatedFormInput.value,
      updatedFormInput.validation
    );
    updatedFormInput.touched = true;
    updatedForm[inputIdentifier] = updatedFormInput;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    setForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const pointsIncrementHandler = () => {
    return null;
  };

  const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!, $userType: String!) {
      loginUser(userInput: { username: $username, password: $password, userType: $userType}) {
        accessToken
      }
    }
  `;

  const [login] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      if (loginUser) {
        teacherLogin ? setUserType('teacher') : setUserType('')
        setAcsToken(loginUser.accessToken);
        return navigate("/home");
      }
    },
    onError() {
      setLoginError(true);
    },
  });

  const formInputArray = [];
  for (let key in form) {
    formInputArray.push({
      id: key,
      config: form[key],
    });
  }

  let display;
  if (!loginError) {
    const userType = teacherLogin ? 'teacher' : 'student'
    display = (
      <form
        method="POST"
        onSubmit={async (event) => {
          event.preventDefault();
          login({
            variables: {
              username: form.username.value,
              password: form.password.value,
              userType
            },
          });
        }}
        className="form"
      >
        {formInputArray.map((formInput) => (
          <Input
            key={formInput.id}
            inputType={formInput.config.inputType}
            inputConfig={formInput.config.config}
            value={formInput.config.value}
            labelConfig={formInput.config.labelConfig}
            helper={formInput.config.helper}
            isValid={!formInput.config.valid}
            shouldValidate={formInput.config.validation}
            touched={formInput.config.touched}
            changed={(event) => inputChangeHandler(event, formInput.id)}
            pointsHandler={pointsIncrementHandler}
          />
        ))}
        <Button btnColor="green" disabled={!formIsValid}>
          Log In
        </Button>
      </form>
    );
  } else {
    display = (
      <div>
        <h1>An error occurred...</h1>
      </div>
    );
  }

  return <div className="form-container">{display}</div>;
};

export default Login;
