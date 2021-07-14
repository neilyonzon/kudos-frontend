import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";

const ClassesForm = (props) => {
  //Form Data -> useState Hook
  //Enable Save -> useState Hook
  //Function to map form data into form inputs
  //Function to handle input change. If input change, change state to touched. Also make sure valid is available.
  //Function to handle save button.
  //Return form inputs

  const [formData, setFormData] = useState([{}]);

  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" />
        </button>
      </div>
      <div className="class-settings">
        <div className="class-settings__group">
          <div className="class-settings__name">
            <label className="settings-form__label">Class #1 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id="class-name-1"
              name="class-name-1"
            />
          </div>
          <div className="class-settings__img">
            <img
              src="https://placekitten.com/g/200/200"
              alt="placeholder"
            ></img>
            <button className="class-settings__delete">Delete</button>
          </div>
        </div>
        <div className="class-settings__group">
          <div className="class-settings__name">
            <label className="settings-form__label">Class #2 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id="class-name-1"
              name="class-name-1"
            />
          </div>
          <div className="class-settings__img">
            <img
              src="https://placekitten.com/g/200/200"
              alt="placeholder"
            ></img>
            <button className="class-settings__delete">Delete</button>
          </div>
        </div>
        <div className="class-settings__group">
          <div className="class-settings__name">
            <label className="settings-form__label">Class #3 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id="class-name-1"
              name="class-name-1"
            />
          </div>
          <div className="class-settings__img">
            <img
              src="https://placekitten.com/g/200/200"
              alt="placeholder"
            ></img>
            <button className="class-settings__delete">Delete</button>
          </div>
        </div>
        <div className="class-settings__group">
          <div className="class-settings__name">
            <label className="settings-form__label">Class #4 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id="class-name-1"
              name="class-name-1"
            />
          </div>
          <div className="class-settings__img">
            <img
              src="https://placekitten.com/g/200/200"
              alt="placeholder"
            ></img>
            <button className="class-settings__delete">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassesForm;
