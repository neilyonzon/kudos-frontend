import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'

const EditClassCard = (props) => {

  const handleGiveButton = () => {
    giveGift({
      variables: {
        transactionId: props.id
      }
    })
  }

  const TRANSACTION = gql`
    mutation markTransaction($transactionId: Int!){
      markTransactionGiven(transactionId: $transactionId){
        id
      }
    }
  ` 

  const [giveGift] = useMutation(TRANSACTION, {
    onCompleted() {
      props.loadUserInfo();
    },
    onError() {
      console.log("error marking gift as given");
    }
  })

  const convertDate = (date) => {
    let convertedDate = new Date(date);
    console.log(convertedDate)
    return convertedDate.toString().substring(0,15);
  }


  return (
    <div className="transactions__group">
      <p>
        {props.student.firstName}  {props.student.lastName} exchanged  {props.prizeCost}pts for {props.prizeName}
      </p>{" "}
      {props.givenDate ? (<span>Given on {convertDate(props.givenDate)}</span>) : (<button className="btn--micro" onClick={handleGiveButton}>Give Prize</button>)}
    </div>
  );
};

export default EditClassCard;
