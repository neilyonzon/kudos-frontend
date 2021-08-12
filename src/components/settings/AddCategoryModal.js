import React, { useState } from 'react'
import Modal from 'react-modal'

import { gql, useMutation, fromPromise } from '@apollo/client'

import Input from '../forms/Input'
import Button from '../elements/Button'

import { checkValidity } from '../../utils/formValidity'

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

const AddCategoryModal = props => {
    const formStructure = {
        categoryName: {
          inputType: "input",
          labelConfig: {
            display: false,
            label: "CategoryName",
          },
          config: {
            type: "text",
            placeholder: "Category Name",
          },
          helper: "Category Name",
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
    };

    const [form, setForm] = useState(formStructure);
    const [formIsValid, setFormIsValid] = useState(false);

    const CATEGORY = gql`
        mutation createCategory($categoryName: String!){
            createCategory(categoryName: $categoryName){
                id
            }
        }
    `

    const [createCategory] = useMutation(CATEGORY, {
        onCompleted() {
            props.loadUserInfo()
        },
        onError() {
            console.log("error adding category")
        }
    })

    const submitCategoryHandler = async (event) => {
        event.preventDefault()

        createCategory({
            variables: {
                categoryName: form.categoryName.value
            }
        })
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = { ...form };
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
    
        setForm(updatedForm);
        setFormIsValid(formIsValid);
    };

    const formInputArray = [];
    for (let key in form) {
        formInputArray.push({
        id: key,
        config: form[key],
        });
    }

    const closeModalHandler = () => {
        setForm(formStructure)
        props.onClose()
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={closeModalHandler}
            style={customStyles}
        >
            <p>Add a New Category</p>
            <form className="form" onSubmit={submitCategoryHandler}>
                {formInputArray.map((formInput) => (
                    <Input
                        key={formInput.id}
                        inputType={formInput.config.inputType}
                        inputConfig={formInput.config.config}
                        value={formInput.config.value}
                        labelConfig={formInput.config.labelConfig}
                        helper={formInput.config.helper}
                        isValid={!formInput.config.valid}
                        shouldValidate={formInput.config.validation}
                        touched={formInput.config.touched}
                        changed={(event) => inputChangeHandler(event, formInput.id)}
                    />
                    ))
                }
                <Button btnColor="green" disabled={!formIsValid}>
                    Add
                </Button>
            </form>
        </Modal>
    )
}

export default AddCategoryModal