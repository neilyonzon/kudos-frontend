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

  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });

  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" />
        </button>
      </div>
      <div className="categories-settings">
        <div className="categories-settings__group">
          <label for="arts-crafts-category" className="settings-form__label">
            Category #1
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="arts-crafts-category"
            value="Arts &amp; Crafts"
          />
        </div>

        <div className="categories-settings__group">
          <label for="books-category" className="settings-form__label">
            Category #2
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="books-category"
            value="Books"
          />
        </div>
        <div className="categories-settings__group">
          <label for="clothing-category" className="settings-form__label">
            Category #3
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="clothing-category"
            value="Clothing"
          />
        </div>
        <div className="categories-settings__group">
          <label for="home-category" className="settings-form__label">
            Category #4
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="home-category"
            value="Home &amp; Decor"
          />
        </div>
        <div className="categories-settings__group">
          <label for="toys-category" className="settings-form__label">
            Category #5
          </label>
          <input
            type="text"
            className="settings-form__input-text"
            id="toys-category"
            value="Toys"
          />
        </div>
      </div>

      <div className="tabs__actions">
        <button className={`tabs__action-save btn ` + saveBtn.class}>
          Save Update
        </button>
      </div>
    </>
  );
};

export default ClassesForm;
