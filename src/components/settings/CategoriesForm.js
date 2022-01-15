import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

import AddCategoryModal from './AddCategoryModal'
import EditCategoryCard from "./EditCategoryCard";

import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";

const CategoriesForm = (props) => {
  const [categoriesFormData, setCategoriesFormData] = useState({
    categories: props.categories
  })

  const originalCategories = props.categories

  const [changedCategories, setChangedCategories] = useState([])

  const [saveButtonClass, setSaveButtonClass] = useState("btn--settings-disable")

  const [addCatModalOpen, setAddCatModalOpen] = useState(false)

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

  const EDIT_CATEGORIES = gql`
  mutation editCategories($categoryInput: [EditCategory]!) {
    editCategories(
      categoryInput: $categoryInput
    ) {
      id
    }
  }
  `

  const [editCategories] = useMutation(EDIT_CATEGORIES, {
    onCompleted(){
      props.loadUserInfo()
    },
    onError(error){
      console.log("There was an error while editing categories")
      console.log(error)
    }
  })

  const submitCategoriesForm = async (event) => {
    if(saveButtonClass === 'btn--settings'){
      event.preventDefault()
      editCategories({
        variables: {
          categoryInput: changedCategories
        }
      })
    }
  }

  const handleAddCategoryModal = () => {
    setAddCatModalOpen(!addCatModalOpen)
  }

  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" onClick={handleAddCategoryModal}/>
        </button>
      </div>
      <div className="categories-settings">
        {
          categoriesFormData.categories && categoriesFormData.categories.map((cat, idx) => (
            <EditCategoryCard
              key={idx}
              item={cat}
              index={idx}
              onChange={inputChangeHandler}
              loadUserInfo={props.loadUserInfo}
              categories={props.categories}
            />
          ))
        }
      </div>

      <div className="tabs__actions">
        <button 
          className={`tabs__action-save btn ` + saveButtonClass}
          onClick={submitCategoriesForm}
        >
          Save Update
        </button>
      </div>
      <AddCategoryModal
        isOpen={addCatModalOpen}
        onClose={handleAddCategoryModal}
        loadUserInfo={props.loadUserInfo}
      />
    </>
  );
};

export default CategoriesForm;
