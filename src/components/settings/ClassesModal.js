import React, { useState, useRef } from "react";
import Modal from "react-modal";

import { gql, useMutation } from "@apollo/client";
import axios from "axios";

import Input from "../forms/Input";
import Button from "../elements/Button";

import { checkValidity } from "../../utils/formValidity";
import { generateImageBase64, formatFileName } from "../../utils/image";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

const ClassModal = (props) => {
  const formStructure = {
    className: {
      inputType: "input",
      labelConfig: {
        display: false,
        label: "ClassName",
      },
      config: {
        type: "text",
        placeholder: "Class Name",
      },
      helper: "Class Name",
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

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const inputFile = useRef(null);

  const S3SIGN = gql`
    mutation s3Signature($fileName: String!, $fileType: String!) {
      signS3(fileName: $fileName, fileType: $fileType) {
        signedRequest
        url
      }
    }
  `;

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const [getS3Signature] = useMutation(S3SIGN, {
    async onCompleted({ signS3 }) {
      await uploadToS3(imageFile, signS3.signedRequest);

      classes({
        variables: {
          id: props.id ? props.id : "",
          classId: props.classId ? props.classId : "",
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          username: form.username.value,
          password: form.password.value,
          imageUrl: signS3.url,
        },
      });
    },
    onError() {
      console.log("unable to get s3 signature!");
    },
  });

  let CLASS;
  CLASS = gql`
  mutation postCreateStudent(
    $className: String!
    $imageUrl: String!
  ) {
    createClass(
      classInput: {
        className: $className
        imageUrl: $imageUrl
      }
    ) {
      id
    }
  }
`;

  const [classes] = useMutation(CLASS, {
    onCompleted() {
      props.refreshData();
    },
    onError() {
      console.log("error adding student");
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

  const openImageFilePicker = (event) => {
    event.preventDefault();
    inputFile.current.click();
  };

  const selectImageHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    generateImageBase64(file)
      .then((b64) => {
        console.log(file);
        setImagePreview(b64);
        setImageFile(file);
      })
      .catch((err) => console.log(err));
  };

  const submitClassHandler = async (event) => {
    event.preventDefault();

    if (imageFile) {
      const prevFileName = props.imageUrl
        ? "images/" + props.imageUrl.split("/").slice(-1)[0]
        : null;
      console.log("here is the file name!!!", prevFileName);
      getS3Signature({
        variables: {
          fileName: prevFileName
            ? prevFileName
            : formatFileName(imageFile.name),
          fileType: imageFile.type,
        },
      });
    } else {
      classes({
        variables: {
          id: props.id ? props.id : "",
          className: form.className.value,
          imageUrl: props.imageUrl ? props.imageUrl : "dummyImageUrl",
        },
      });
    }

    props.onClose();
  };


  const closeModalHandler = () => {
    setForm(formStructure);
    setImagePreview(null);
    setImageFile(null);
    props.onClose();
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
      onRequestClose={closeModalHandler}
      style={customStyles}
    >
      <p>Add a New Class
      </p>
      <form className="form" onSubmit={submitClassHandler}>
        <div
          className="form__image"
          style={{
            backgroundImage: `url('${
              imagePreview ? imagePreview : props.imageUrl
            }')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <button className="form__image-btn" onClick={openImageFilePicker}>
            {imagePreview ? null : "Upload/Edit"}
          </button>
        </div>

        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={selectImageHandler}
        />

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

        <Button btnColor="green" disabled={!formIsValid}>Add
        </Button>

   
      </form>
    </Modal>
  );
};

export default ClassModal;
