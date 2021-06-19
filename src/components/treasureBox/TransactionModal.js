import React from 'react'
import Modal from "react-modal"

import { gql, useMutation } from '@apollo/client'
import Button from "../elements/Button"

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "40%",
    },
  };

const TransactionModal = props => {

    const SUBMIT = gql`
        mutation makeTransaction($prizeId: Int!){
            postTransaction(transactionInput: {prizeId: $prizeId}){
                id
            }
        }
    `

    const [submitTransaction] = useMutation(SUBMIT, {
        onCompleted() {
          props.refreshData();
        },
        onError() {
          console.log("unable to complete transaction!");
        },
      });
    
    const makeTransactionHandler = (event) => {
        event.preventDefault()
        submitTransaction({
            variables: {
                prizeId: props.id
            }
        })
    }
    
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            style={customStyles}
        >
            <img
                src={props.imageUrl}
            ></img>
            <h2>{props.prizename}</h2>
            <h3>{props.kudoscost}</h3>
            <Button btnColor="green" clicked={makeTransactionHandler}>
                Buy!
            </Button>
        </Modal>
    )
}

export default TransactionModal