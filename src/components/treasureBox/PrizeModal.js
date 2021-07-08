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
    category: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "Category",
      },
      config: {
        type: "text",
        placeholder: "Category",
      },
      helper: "Category",
      value: props.category,
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
      value: props.description,
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
      value: props.quantity,
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  let PRIZE;
  if (props.addPrize) {
    PRIZE = gql`
      mutation postCreatePrize(
        $name: String!
        $imageUrl: String!
        $description: String
        $category: String
        $kudosCost: Int!
        $quantity: Int!
        $classId: Int!
      ) {
        createPrize(
          prizeInput: {
            name: $name
            imageUrl: $imageUrl
            description: $description
            category: $category
            kudosCost: $kudosCost
            quantity: $quantity
            classId: $classId
          }
        ) {
          id
        }
      }
    `;
  } else {
    PRIZE = gql`
      mutation postEditPrize(
        $prizeId: Int!
        $name: String!
        $imageUrl: String!
        $description: String
        $category: String
        $kudosCost: Int!
        $quantity: Int!
      ) {
        editPrize(
          prizeInput: {
            prizeId: $prizeId
            name: $name
            imageUrl: $imageUrl
            description: $description
            category: $category
            kudosCost: $kudosCost
            quantity: $quantity
          }
        ) {
          id
        }
      }
    `;
  }

  const [prize] = useMutation(PRIZE, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("error editing prize");
    },
  });

  const DELETE = gql`
    mutation deletePrizes($id: Int!) {
      deletePrizes(prizeInput: { prizeIds: [$id] }) {
        id
      }
    }
  `;

  const [deletePrize] = useMutation(DELETE, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("unable to delete student!");
    },
  });

  // const populateFormData = () => {
  //   const updatedForm = { ...form };
  //   updatedForm["prizename"].value = props.prizename;
  //   updatedForm["kudoscost"].value = props.kudoscost;
  //   updatedForm["points"].value = props.quantity;
  //   updatedForm["category"].value = props.category;
  //   updatedForm["description"].value = props.description;
  // };

  // if (props.edit === true) {
  //   populateFormData();
  // }

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
    let updatedForm = { ...form };
    let updatedInput = updatedForm[inputIdentifier];
    if (operator === "plus") {
      updatedInput.value++;
    }
    if (operator !== "plus" && updatedInput.value > 0) {
      updatedInput.value--;
    }
    updatedForm[inputIdentifier] = updatedInput;
    setForm(updatedForm);
  };

  const submitPrizeHandler = async (event) => {
    event.preventDefault();
    prize({
      variables: {
        prizeId: props.id ? props.id : "",
        classId: props.classId ? props.classId : "",
        name: form.prizename.value,
        imageUrl: "",
        kudosCost: parseInt(form.kudoscost.value),
        quantity: parseInt(form.points.value),
        description: form.description.value,
        category: "Toy",
      },
    });
    props.onClose();
  };

  const deletePrizeHandler = async (event) => {
    event.preventDefault();
    console.log("clicked!");
    deletePrize({
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
        {props.addPrize
          ? "Add a New Prize"
          : "Edit details for " + props.prizename}
      </p>
      <form className="form" onSubmit={submitPrizeHandler}>
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
          {props.addPrize ? "Add" : "Update"}
        </Button>

        {!props.addPrize ? (
          <Button btnColor="green" clicked={deletePrizeHandler}>
            Delete Prize
          </Button>
        ) : null}
      </form>
    </Modal>
  );
};

export default PrizeModal;
