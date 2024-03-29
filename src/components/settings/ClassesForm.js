import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { gql, useMutation } from "@apollo/client";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import AddClassModal from "./AddClassModal";

import EditClassCard from './EditClassCard'

const ClassesForm = (props) => {

  const [classFormData, setClassForm] = useState({
    classes: props.classes
  });

  const originalClasses = props.classes

  const [changedClasses, setChangedClasses] = useState([])

  const [saveButtonClass, setSaveButtonClass] = useState("btn--settings-disable")

  const [openAddClassModal, setOpenAddClassModal] = useState(false);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...classFormData };
    const updatedArray = [...classFormData.classes];
    const updatedElement = {...updatedArray[inputIdentifier]};
    updatedElement.className = event.target.value;
    updatedArray[inputIdentifier] = updatedElement;
    updatedForm.classes = updatedArray;

    let formIsValid = true;
    for(let i = 0; i < updatedForm.classes.length; i++) {
      if(updatedForm.classes[i].className === "") {
        formIsValid = false;
        console.log("There is an empty field. Disable button");
        setSaveButtonClass("btn--settings-disable");
      }
    }
    if(formIsValid) {
      updateChangedClasses(updatedForm.classes, originalClasses)
    }
    setClassForm(updatedForm);
  }

  const updateChangedClasses = (updatedForm, originalForm) => {
    
    let changedClasses = []
    for (let i = 0; i < updatedForm.length; i++){
      if(updatedForm[i].className !== originalForm[i].className){
        changedClasses.push({ id: updatedForm[i].id, className: updatedForm[i].className })
      }
    }
    setChangedClasses(changedClasses)
    if(changedClasses.length > 0){
      setSaveButtonClass("btn--settings")
    } else {
      setSaveButtonClass("btn--settings-disable")
    }
  }

  const EDIT_CLASSES = gql`
  mutation postEditClasses($classInput: [EditClassInput]!) {
    editClasses(
      classInput: $classInput
    ){
      id
    }
  }`
  
  const submitClassesForm = async (event) => {

    if(saveButtonClass === 'btn--settings'){
      event.preventDefault();
      console.log(classFormData.classes)
      editClasses({
        variables: {
          classInput: changedClasses
        }
      })
    } else{
      alert("Each class name must be at least one character or no class names have been changed")
    }
  }

  const [editClasses] = useMutation(EDIT_CLASSES, {
    onCompleted() {
      props.loadUserInfo()
    }, 
    onError(error) {
      console.log("There was an error while editing the classes");
      console.log(error)
    }
  })

  const handleAddClassModal = () => {
    setOpenAddClassModal(!openAddClassModal);
  }

  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" onClick={handleAddClassModal} />
        </button>
      </div>
      <div className="class-settings">
        {classFormData.classes.map((item, idx) => (
          <EditClassCard
            key={idx}
            item={item}
            index={idx}
            onChange={inputChangeHandler}
            loadUserInfo={props.loadUserInfo}
          />
        ))}
      </div>
      <div className="tabs__actions">
      <button
          className={`tabs__action-save btn ` + saveButtonClass}
          onClick={submitClassesForm}
        >
          Save Update
        </button>
      </div>
      <AddClassModal
        addClass={true}
        isOpen={openAddClassModal}
        onClose={handleAddClassModal}
        loadUserInfo={props.loadUserInfo}
      />
    </>
  );
};

export default ClassesForm;
