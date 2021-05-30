import React, { useState } from "react";
import Modal from "react-modal";

import { gql, useMutation } from "@apollo/client";

import Input from "../forms/Input";
import Button from "../elements/Button";

import { checkValidity } from "../../utils/formValidity";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

const PrizeModal = (props) => {
  const [form, setForm] = useState({
    prizename: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "PrizeName",
      },
      config: {
        type: "text",
        placeholder: "Prize Name",
      },
      helper: "Prize Name",
      value: props.prizename,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    kudoscost: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "KudosCost",
      },
      config: {
        type: "text",
        placeholder: "Kudos Cost",
      },
      helper: "Kudos Cost",
      value: props.kudoscost,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    description: {
      inputType: "textarea",
      labelConfig: {
        display: false,
        label: "Description",
      },
      config: {
        type: "text",
        placeholder: "Description",
      },
      helper: "Description",
      value: props.lastName,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    points: {
      inputType: "points",
      labelConfig: {
        display: true,
        label: "Quantity",
      },
      config: {
        placeholder: "",
      },
      helper: "",
      value: 0,
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  let PRIZE;
  if (props.addStudent) {
    PRIZE = gql`
      mutation postCreateStudent(
        $firstName: String!
        $lastName: String!
        $username: String!
        $password: String!
        $classId: Int!
      ) {
        createStudent(
          studentInput: {
            firstName: $firstName
            lastName: $lastName
            username: $username
            password: $password
            classId: $classId
          }
        ) {
          id
        }
      }
    `;
  } else {
    PRIZE = gql`
      mutation postEditStudent(
        $id: Int!
        $firstName: String!
        $lastName: String!
        $username: String!
        $password: String!
      ) {
        editStudent(
          studentInput: {
            id: $id
            firstName: $firstName
            lastName: $lastName
            username: $username
            password: $password
          }
        ) {
          id
        }
      }
    `;
  }

  const [student] = useMutation(PRIZE, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("error editing student");
    },
  });

  const DELETE = gql`
    mutation deleteStudent($id: Int!) {
      deleteStudents(studentInput: { studentIds: [$id] }) {
        id
      }
    }
  `;

  const [deleteStudent] = useMutation(DELETE, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("unable to delete student!");
    },
  });

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

  const pointsIncrementHandler = (inputIdentifier, operator) => {
    console.log(inputIdentifier);
    let updatedForm = { ...this.state.form };
    let updatedInput = this.state.form[inputIdentifier];
    operator == "plus" ? updatedInput.value++ : updatedInput.value--;
    updatedForm[inputIdentifier] = updatedInput;
    this.setState({
      form: updatedForm,
    });
  };

  const submitStudentHandler = async (event) => {
    event.preventDefault();
    student({
      variables: {
        id: props.id ? props.id : "",
        classId: props.classId ? props.classId : "",
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        username: form.username.value,
        password: form.password.value,
      },
    });
    props.onClose();
  };

  const deleteStudentHandler = async (event) => {
    event.preventDefault();
    console.log("clicked!");
    deleteStudent({
      variables: {
        id: props.id ? props.id : "",
      },
    });
  };

  const formInputArray = [];
  for (let key in form) {
    formInputArray.push({
      id: key,
      config: form[key],
    });
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={customStyles}
    >
      <p>
        {props.addStudent
          ? "Add a New Prize"
          : props.firstName + " " + props.lastName}
      </p>
      <form className="form" onSubmit={submitStudentHandler}>
        <div className="form__image">
          <button className="form__image-btn">Upload/Edit</button>
        </div>
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
            pointsHandler={pointsIncrementHandler}
          />
        ))}

        <Button btnColor="green" disabled={!formIsValid}>
          {props.addStudent ? "Add" : "Update"}
        </Button>
      </form>

      {!props.addStudent ? (
        <Button btnColor="green" clicked={deleteStudentHandler}>
          Delete Student
        </Button>
      ) : null}
    </Modal>
  );
};

export default PrizeModal;
