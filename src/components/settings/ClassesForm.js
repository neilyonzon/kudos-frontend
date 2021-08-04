import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import {gql, useMutation} from "@apollo/client";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";
import { compareFormValues } from "../../utils/compareFormValues";
import ClassModal from "./ClassesModal";

const ClassesForm = (props) => {

  const [classFormData, setClassForm] = useState({
    classes: props.classes
  });

  const [ogFormData, setOgFormData] = useState({
    classes: props.classes
  })


  const updateSaveBtn = (status) => {
    if (status == "enable") {
      setSaveBtn({
        class: "btn--settings",
      });
    } else {
      setSaveBtn({
        class: "btn--settings-disable",
      });
    }
  };

  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });


  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...classFormData };
    const updatedArray = [...classFormData.classes];
    const updatedElement = {...updatedArray[inputIdentifier]};
    updatedElement.className = event.target.value;
    updatedArray[inputIdentifier] = updatedElement;
    updatedForm.classes = updatedArray;
    let formIsValid = true;


    for (let i = 0; i < updatedForm.classes.length; i++) {
      if (updatedForm.classes[i].className == "") {
        formIsValid = false;
        console.log("There is an empty field. Disable button");
        updateSaveBtn("disable");
      }
    }
    if (formIsValid) {
      if (!compareArray( updatedForm.classes, ogFormData.classes, "className")) {
        updateSaveBtn("enable");
      } else {
        updateSaveBtn("disable");
      }
    }
    setClassForm(updatedForm);
  }

  const compareArray = (arr1, arr2, property) => {
   let same = true;
   for (let i = 0; i < arr1.length; i++) {
     if (arr1[i][property] !== arr2[i][property]) {
       same = false;
     }
   }
   return same;
  }


  //Variable with GraphQL String
  let CLASSES;
  CLASSES = gql`
  mutation postEditClasses(
    $classes: Array!
  ) {
    editClasses(
      classInput: $classes
    )
  }
`;

  
  const submitClassesForm = async (event) => {
    if (saveBtn.class == "btn--settings") {
      event.preventDefault();
      console.log(classFormData.classes)
    } else {
      alert("Button is disabled");
    }
  }

  const [classes] = useMutation(CLASSES, {
    onCompleted() {
      updateSaveBtn("disable");
      setOgFormData(classFormData);
      props.loadUserInfo()
    }, 
    onError() {
      console.log("There was an error while editing the classe");
    }
  })

  const [openAddClass, setOpenAddClass] = useState(false);

  const handleAddClassModal = () => {
    setOpenAddClass(!openAddClass);
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


      {classFormData.classes.map((item, index) => (
        <div className="class-settings__group" key={index}>
          <div className="class-settings__name">
            <label className="settings-form__label">Class #1 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id={`class-name-${index}`}
              name={`class-name-${index}`}
              value={item.className}
              onChange={(e) => inputChangeHandler(e, index)}
            />
          </div>
          <div className="class-settings__img">
            <img
              src="https://placekitten.com/g/200/200"
              alt="placeholder"
            ></img>
            <button className="class-settings__delete">Delete</button>
          </div>
        </div> ))}
      </div>
      <div className="tabs__actions">
      <button
          className={`tabs__action-save btn ` + saveBtn.class}
          onClick={submitClassesForm}
        >
          Save Update
        </button>
      </div>
      <ClassModal
      addClass={true}
      isOpen={openAddClass}
      onClose={handleAddClassModal}
      refreshData={props.refreshData}
      classId={props.classId}
      />
    </>
  );
};

export default ClassesForm;
