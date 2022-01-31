import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Input from "../forms/Input";
import Button from "../elements/Button";

const Register = (props) => {
  //Add Hooks
  const [registerError, setRegisterError] = useState(false);

  const [form, setForm] = useState({
    firstName: {
      inputType: "",
      labelConfig: {
        display: false,
        label: "First Name",
      },
      config: {
        type: "text",
        placeholder: "First Name",
      },
      helper: "Enter first name",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "Last Name",
      },
      config: {
        type: "text",
        placeholder: "Last Name",
      },
      helper: "Enter last name",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "Email",
      },
      config: {
        type: "email",
        placeholder: "oscar@school.edu",
      },
      helper: "Enter valid email.",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
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
      helper: "Password must be 8 characters long.",
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  //Add inner functions
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

  //Add graphql string used for mutation hook
  const REGISTER_TEACHER = gql`
    mutation RegisterTeacher(
      $firstName: String!
      $lastName: String!
      $username: String!
      $email: String!
      $password: String!
    ) {
      createTeacher(
        teacherInput: {
          firstName: $firstName
          lastName: $lastName
          username: $username
          email: $email
          password: $password
        }
      ) {
        firstName
      }
    }
  `;

  //Create mutation hook
  const [register] = useMutation(REGISTER_TEACHER, {
    onCompleted({ createTeacher }) {
      if (createTeacher) {
        alert(
          "Registration Success! Please login. (Replace with Modal Notification/Toaster?)"
        );
        //Login User if success
        props.redirectLogin("x", "login");
      }
    },
    onError() {
      setRegisterError(true);
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

  if (!registerError) {
    display = (
      <form
        method="POST"
        onSubmit={async (event) => {
          event.preventDefault();
          register({
            variables: {
              firstName: form.firstName.value,
              lastName: form.lastName.value,
              email: form.email.value,
              username: form.username.value,
              password: form.password.value,
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
          Register
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

export default Register;
