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

const ActionModal = props => {

    const ACTION = props.actionType === 'transaction' && props.hasEnoughKudos ? gql`
        mutation makeTransaction($prizeId: Int!){
            postTransaction(transactionInput: {prizeId: $prizeId}){
                id
            }
        }
    ` : 
    gql`
        mutation addWish($prizeId: Int!){
            addToWishlist(wishlistInput: {prizeId: $prizeId}){
                id
            }
        }
    `

    const [submitAction] = useMutation(ACTION, {
        onCompleted() {
          props.refreshData();
        },
        onError() {
          console.log("unable to complete transaction!");
        },
      });
    
    const makeTransactionHandler = (event) => {
        event.preventDefault()
        submitAction({
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
            {props.actionType === 'transaction' && !props.hasEnoughKudos ? 
                <div>{`You don't have enough kudos! You only have ${props.kudosBalance} kudos. You need ${props.kudoscost - props.kudosBalance} more. Click the wish button to add to your wishlist!`}</div> : null}
            <h2>{props.prizename}</h2>
            <h3>{props.kudoscost}</h3>
            <Button btnColor="green" clicked={makeTransactionHandler}>
                {props.actionType === 'transaction' && props.hasEnoughKudos ? 'Buy!' : 'Wish!'}
            </Button>
        </Modal>
    )
}

export default ActionModal