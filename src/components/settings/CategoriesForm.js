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

  const [categoriesFormData, setCategoriesFormData] = useState({
    categories: props.categories
  })

  const originalCategories = props.categories

  const [changedCategories, setChangedCategories] = useState([])

  const [saveButtonClass, setSaveButtonClass] = useState("btn--settings-disable")

  // const [saveBtn, setSaveBtn] = useState({
  //   class: "btn--settings-disable",
  // });

  const [openDeleteCat, setOpenDeleteCat] = useState(false)

  const toDeleteCat = useRef(props.categories[0])

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...categoriesFormData }
    const updatedArray = [...categoriesFormData.categories]
    const updatedElement = { ...updatedArray[inputIdentifier] }
    updatedElement.category = event.target.value
    updatedArray[inputIdentifier] = updatedElement
    updatedForm.categories = updatedArray

    let formIsValid = true
    for(let i = 0; i < updatedForm.categories.length; i++){
      if(updatedForm.categories[i].category === ""){
        formIsValid = false
        console.log("There is an empty field. Disable button")
        setSaveButtonClass("btn--settings-disable")
      }
    }
    if(formIsValid){
      updateChangedCategories(updatedForm.categories, originalCategories)
    }
    setCategoriesFormData(updatedForm)
  }

  const updateChangedCategories = (updatedForm, originalForm) => {
    let changedCategories = []
    for(let i = 0; i < updatedForm.length; i++){
      if(updatedForm[i].category !== originalForm[i].category){
        changedCategories.push({ id: updatedForm[i].id, name: updatedForm[i].category})
      }
    }
    setChangedCategories(changedCategories)
    if(changedCategories.length > 0){
      setSaveButtonClass("btn--settings")
    } else{
      setSaveButtonClass("btn--settings-disable")
    }
  }

  const openDeleteHandler = (cat) => {
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
                {cat.category === "Toy" ? `${cat.category} (Default)` : cat.category}
              </label>
              
              {cat.category !== "Toy" ? 
                <>
                  <input
                    type="text"
                    className="settings-form__input-text"
                    id={cat.category}
                    value={cat.category}
                  />
                  <button onClick={() => openDeleteHandler(cat)}>Delete</button>
                </>
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
