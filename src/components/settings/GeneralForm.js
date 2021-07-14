import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { checkValidity } from "../../utils/formValidity";

const GeneralForm = (props) => {
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
    email: props.data.email,
  });

  //Function to handle form save
  const handleGeneralForm = () => {
    console.log(formData);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...formData };
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
    setFormData(updatedForm);
    // setFormIsValid(formIsValid);
  };

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
            value={formData.email}
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
          className="tabs__action-save btn btn--settings"
          onClick={handleGeneralForm}
        >
          Save Update
        </button>
      </div>
    </>
  );
};

export default GeneralForm;
