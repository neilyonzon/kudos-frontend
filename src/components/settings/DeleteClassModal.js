import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { gql, useMutation } from '@apollo/client';
import Input from '../forms/Input';
import Button from '../elements/Button';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
};

const DeleteClassModal = props => {

    const DELETE = gql`
    mutation delete_class($id: Int!) {
        deleteClass(classInput: { id: $id }) {
        id
      }
    }
  `;

  const [delete_class] = useMutation(DELETE, {
    onCompleted() {
        props.loadUserInfo()
    },
    onError() {
      console.log("unable to delete class!");
    },
  });


    const deleteClassHandler = () => {
        delete_class({
            variables: {
                id: parseInt(props.classId),
            }
        })
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            style={customStyles}
        >
            <div>
                <p>Are you sure you want to delete {props.className}?</p>
                <Button
                    btnColor="red"
                    clicked={deleteClassHandler}
                >
                    Delete Class
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteClassModal;