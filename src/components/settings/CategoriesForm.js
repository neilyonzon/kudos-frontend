import React, { useState, useRef } from "react";

import DeleteCatModal from './DeleteCatModal';

import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";

const CategoriesForm = (props) => {
  //Form Data -> useState Hook
  //Enable Save -> useState Hook
  //Function to map form data into form inputs
  //Function to handle input change. If input change, change state to touched. Also make sure valid is available.
  //Function to handle save button.
  //Return form inputs

  // const [formData, setFormData] = useState([{}]);

  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });

  const [openDeleteCat, setOpenDeleteCat] = useState(false)

  const toDeleteCat = useRef(props.categories[0])

  const openDeleteHandler = (cat) => {
    let remainingCategories = []
    props.categories.forEach(category => {
      if(category.category !== cat.category){
        remainingCategories.push({value: category.category, displayValue: category.category })
      }
    })
    // setDisplayCategories(remainingCategories)
    toDeleteCat.current = cat
    setOpenDeleteCat(true)
  }

  const closeDeleteHandler = () => setOpenDeleteCat(false)

  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" />
        </button>
      </div>
      <div className="categories-settings">
        {
          props.categories.map((cat, idx) => (
            <div className="categories-settings__group" key={cat.category}>
              <label className="settings-form__label">
                {cat.category}
              </label>
              <input
                type="text"
                className="settings-form__input-text"
                id={cat.category}
                value={cat.category}
              />
              {cat.category !== "Toy" ? 
                <button onClick={() => openDeleteHandler(cat)}>Delete</button>
                : null
              }
            </div>
          ))
        }
      </div>

      <DeleteCatModal 
        isOpen={openDeleteCat}
        onClose={closeDeleteHandler}
        toDeleteCategory={toDeleteCat.current}
        categories={props.categories}
        loadUserInfo={props.loadUserInfo}
      />

      <div className="tabs__actions">
        <button className={`tabs__action-save btn ` + saveBtn.class}>
          Save Update
        </button>
      </div>
    </>
  );
};

export default CategoriesForm;
