import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { compareFormValues } from "../../utils/compareFormValues";

const GeneralForm = (props) => {
  const [ogFormData, setOgFormData] = useState({
    firstName: {
      value: props.teacherInfo.firstName,
      validation: {
        required: true,
      },
      valid: false,
    },
    lastName: {
      value: props.teacherInfo.lastName,
      validation: {
        required: true,
      },
      valid: false,
    },
    username: {
      value: props.teacherInfo.username,
      validation: {
        required: true,
      },
      valid: false,
    },
  });

  const [formData, setFormData] = useState({
    firstName: {
      value: props.teacherInfo.firstName,
      validation: {
        required: true,
      },
      valid: false,
    },
    lastName: {
      value: props.teacherInfo.lastName,
      validation: {
        required: true,
      },
      valid: false,
    },
    username: {
      value: props.teacherInfo.username,
      validation: {
        required: true,
      },
      valid: false,
    },
  });

  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...formData };
    const updatedFormInput = { ...updatedForm[inputIdentifier] };
    updatedFormInput.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormInput;
    let formIsValid = true;
    for (const field in updatedForm) {
      if (updatedForm[field].value === "") {
        formIsValid = false;
        console.log("There is an empty field. Disable button");
        updateSaveBtn("disable");
      }
    }
    if (formIsValid) {
      if (!compareFormValues(updatedForm, ogFormData)) {
        updateSaveBtn("enable");
      } else {
        updateSaveBtn("disable");
      }
    }
    setFormData(updatedForm);
  };

  const updateSaveBtn = (status) => {
    if (status === "enable") {
      setSaveBtn({
        class: "btn--settings",
      });
    } else {
      setSaveBtn({
        class: "btn--settings-disable",
      });
    }
  };
  

  let TEACHER;
  TEACHER = gql`
    mutation postEditTeacher(
      $firstName: String!
      $lastName: String!
      $username: String!
    ) {
      editTeacher(
        teacherInput: {
          firstName: $firstName
          lastName: $lastName
          username: $username
        }
      ) {
        id
      }
    }
  `;

  const submitGeneralForm = async (event) => {
    if (saveBtn.class === "btn--settings") {
      event.preventDefault();

      teacher({
        variables: {
          firstName: formData.firstName.value,
          lastName: formData.lastName.value,
          username: formData.username.value,
        },
      });
    } 
  };

  const [teacher] = useMutation(TEACHER, {
    onCompleted() {
      updateSaveBtn("disable");
      setOgFormData(formData);
      props.loadUserInfo()
    },
    onError() {
      console.log("error editing teacher");
    },
  });
  
  return (
    <>
      <form className="settings-form">
        <div className="settings-form__group">
          <label className="settings-form__label" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="first-name"
            name="first-name"
            aria-describedby="settings-form__helper-text__first-name"
            value={formData.firstName.value}
            onChange={(e) => inputChangeHandler(e, "firstName")}
          />
          <span
            id="settings-form__helper-text__first-name"
            className="settings-form__helper"
          >
            Update your first name
          </span>
        </div>

        <div className="settings-form__group">
          <label className="settings-form__label" htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="last-name"
            name="last-name"
            aria-describedby="settings-form__helper-last-name"
            value={formData.lastName.value}
            onChange={(e) => inputChangeHandler(e, "lastName")}
          />
          <span
            id="settings-form__helper-last-name"
            className="settings-form__helper"
          >
            Update your last name
          </span>
        </div>

        <div className="settings-form__group">
          <label className="settings-form__label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="username"
            name="username"
            aria-describedby="settings-form__helper-text__username"
            value={formData.username.value}
            onChange={(e) => inputChangeHandler(e, "username")}
          />
          <span
            id="settings-form__helper-text__username"
            className="settings-form__helper"
          >
            Update your Username
          </span>
        </div>
      </form>
      <div className="tabs__actions">
        <button
          className={`tabs__action-save btn ` + saveBtn.class}
          onClick={submitGeneralForm}
        >
          Save Update
        </button>
      </div>
    </>
  );
};

export default GeneralForm;
