import React, { useState } from 'react';
import Modal from 'react-modal';

import { gql, useMutation } from '@apollo/client';

import Input from '../forms/Input';
import Button from '../elements/Button';

import { checkValidity } from '../../utils/formValidity';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppElement('#yourAppElement')

const StudentModal = props => {

    const [form, setForm] = useState({
        username: {
            inputType: "input",
            labelConfig: {
              display: false,
              label: "Username",
            },
            config: {
              type: "text",
              placeholder: "Username",
            },
            helper: "Username",
            value: props.username,
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
        },
        firstName: {
            inputType: "input",
            labelConfig: {
              display: false,
              label: "FirstName",
            },
            config: {
              type: "text",
              placeholder: "First Name",
            },
            helper: "First Name",
            value: props.firstName,
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
        },
        lastName: {
            inputType: "input",
            labelConfig: {
              display: false,
              label: "LastName",
            },
            config: {
              type: "text",
              placeholder: "Last Name",
            },
            helper: "Last Name",
            value: props.lastName,
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            inputType: "input",
            labelConfig: {
              display: false,
              label: "Password",
            },
            config: {
              type: "password",
              placeholder: "Password",
            },
            helper: "",
            value: "",
            validation: {
              required: false,
            },
            valid: false,
            touched: false,
          }
    })

    const [formIsValid, setFormIsValid] = useState(false);

    let QUERY
    if(props.add){
      QUERY = gql`
        mutation postCreateStudent($firstName: String!, $lastName: String!, $username: String!, $password: String!){
          createStudent(studentInput: {firstName: $firstName, lastName: $lastName, username: $username, password: $password}){
            id
          }
        }
      `
    } else {
      QUERY = gql`
      mutation postEditStudent($id: Int!, $firstName: String!, $lastName: String!, $username: String!, $password: String!){
          editStudent(studentInput: {id: $id, firstName: $firstName, lastName: $lastName, username: $username, password: $password}){
              id
          }
        }
      `
    }

    const [student] = useMutation(QUERY, {
        onCompleted(){
            props.refreshData()
        },
        onError(){
            console.log('error editing student')
        }
    })

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

    const submitStudentHandler = async (event) => {
        event.preventDefault()
        student({
            variables: {
                id: props.id ? props.id : '',
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                username: form.username.value,
                password: form.password.value
            }
        })
        props.onClose()
    }

    const formInputArray = [];
    for (let key in form) {
        formInputArray.push({
        id: key,
        config: form[key],
        });
    }

    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            style={customStyles}
        >
            <p>{props.firstName + " " + props.lastName}</p>
            <form 
                className="form"
                onSubmit={submitStudentHandler}
            >
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
                ))}

                <Button btnColor="green" disabled={!formIsValid}>
                    Update
                </Button>
            </form>

        </Modal>
    )
}

export default StudentModal;