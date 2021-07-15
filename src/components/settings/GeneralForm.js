import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { checkValidity } from "../../utils/formValidity";
import { compareObjects } from "../../utils/compareObjects";

const GeneralForm = (props) => {
  //Original Form Data
  const [ogFormData, setOgFormData] = useState({
    firstName: {
      value: props.data.firstName,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      value: props.data.lastName,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: props.data.email,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  //Initialize states or Hooks
  const [formData, setFormData] = useState({
    firstName: {
      value: props.data.firstName,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      value: props.data.lastName,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: props.data.email,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });

  //Function to handle form save
  const handleGeneralForm = () => {
    console.log(formData);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...formData };
    const updatedFormInput = { ...updatedForm[inputIdentifier] };
    updatedFormInput.value = event.target.value;
    // updatedFormInput.valid = checkValidity(
    //   updatedFormInput.value,
    //   updatedFormInput.validation
    // );
    // updatedFormInput.touched = true;
    updatedForm[inputIdentifier] = updatedFormInput;

    // let formIsValid = true;
    // for (let inputIdentifier in updatedForm) {
    //   formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    // }
    updateSaveBtn(compareObjects(updatedForm, ogFormData));
    setFormData(updatedForm);
  };

  const updateSaveBtn = (objectCompare) => {
    if (objectCompare == false) {
      setSaveBtn({
        class: "btn--settings",
      });
    } else {
      setSaveBtn({
        class: "btn--settings-disable",
      });
    }
    console.log(objectCompare);
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
          email: $email
        }
      ) {
        id
      }
    }
  `;

  const submitTeacherHandler = async (event) => {
    event.preventDefault();

    teacher({
      variables: {
        id: props.id ? props.id : "",
        classId: props.classId ? props.classId : "",
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        email: formData.email.value,
        // password: formData.password.value,
        // imageUrl: props.imageUrl ? props.imageUrl : "dummyImageUrl",
      },
    });
  };

  const [teacher] = useMutation(TEACHER, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("error editing student");
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
          <label className="settings-form__label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="email"
            name="email"
            aria-describedby="settings-form__helper-text__email"
            value={formData.email.value}
            onChange={(e) => inputChangeHandler(e, "email")}
          />
          <span
            id="settings-form__helper-text__email"
            className="settings-form__helper"
          >
            Update your Email
          </span>
        </div>
      </form>
      <div className="tabs__actions">
        <button
          className={`tabs__action-save btn ` + saveBtn.class}
          onClick={handleGeneralForm}
        >
          Save Update
        </button>
      </div>
    </>
  );
};

export default GeneralForm;
