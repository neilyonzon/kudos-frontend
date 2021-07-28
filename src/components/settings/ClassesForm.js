import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";

const ClassesForm = (props) => {

  const [classFormData, setClassForm] = useState({
    classes: props.classes
  });

  const [ogFormData, setOgFormData] = useState({
    classes: props.classes
  })


  const [saveBtn, setSaveBtn] = useState({
    class: "btn--settings-disable",
  });


  const inputChangeHandler = (event, inputIdentifier) => {
    console.log(event);
    console.log(inputIdentifier)

    const updatedForm = { ...classFormData };
    const updatedArray = [...classFormData.classes];
    const updatedElement = {...updatedArray[inputIdentifier]};
    updatedElement.className = event.target.value;
    console.log(updatedElement);
    updatedArray[inputIdentifier] = updatedElement;
    updatedForm.classes = updatedArray;
    // updatedFormInput.className = event.target.value;
    // updatedForm.classes[inputIdentifier] = updatedFormInput;
    // let formIsValid = true;
    // for (const field in updatedForm) {
    //   if (updatedForm[field].value == "") {
    //     formIsValid = false;
    //     console.log("There is an empty field. Disable button");
    //     updateSaveBtn("disable");
    //   }
    // }
    // if (formIsValid) {
    //   if (!compareFormValues(updatedForm, ogFormData)) {
    //     updateSaveBtn("enable");
    //   } else {
    //     updateSaveBtn("disable");
    //   }
    // }
    setClassForm(updatedForm);
  }
  


  return (
    <>
      <div className="utility-bar">
        <AiOutlineSearch className="icon-search" />

        <button className="list__btn">
          <BiPlus className="icon-plus" />
        </button>
      </div>
      <div className="class-settings">


      {classFormData.classes.map((item, index) => {return <div className="class-settings__group" key={index}>
          <div className="class-settings__name">
            <label className="settings-form__label">Class #1 Name</label>
            <input
              type="text"
              className="settings-form__input-text"
              id="class-name-1"
              name="class-name-1"
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
        </div> })}
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
