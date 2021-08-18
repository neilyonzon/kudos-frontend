import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiWish } from "@react-icons/all-files/si/SiWish";


const ApprovalCard = props => {

  const TRANSACTION = gql`
    mutation makeTransaction($transactionId: Int!, $transactionApproved: Boolean!){
      approveTransaction(approveInput: { transactionId: $transactionId, transactionApproved: $transactionApproved }){
        id
      }
    }
  `

  const [makeTransaction] = useMutation(TRANSACTION, {
    onCompleted(){
      props.refreshData({
        variables: {
          classId: props.classId
        }
      })
    },
    onError(error){
      console.log('unable to approve or deny transaction')
      console.log(error)
    }
  })

  const CANCEL_TRANSACTION = gql`
    mutation cancelTransaction($transactionId: Int!){
      cancelTransaction(transactionId: $transactionId){
        id
      }
    }
  `

  const [cancelTransaction] = useMutation(CANCEL_TRANSACTION, {
    onCompleted(){
      props.refreshData()
    },
    onError(error){
      console.log('unable to cancel transaction')
      console.log(error)
    }
  })

  const approveOrDeclineTransaction = (bool) => {
    makeTransaction({
      variables: {
        transactionId: props.transactionId,
        transactionApproved: bool
      }
    })
  } 

  return (
    <div className="approval-card">
      <span>{props.studentName ? props.studentName : 'You'} requested to <FaExchangeAlt/> {props.prizeCost} kudos for a {props.prizeName}</span>
      {
        props.student ? <button className="btn--micro" onClick={() => cancelTransaction({variables: {transactionId: props.transactionId } })}>Cancel</button> 
          : null
      }
      {
        !props.student ? <button className="btn--micro" onClick={() => approveOrDeclineTransaction(true)}>Approve</button> 
        : null
      }
      {
        !props.student ? <button className="btn--micro" onClick={() => approveOrDeclineTransaction(false)}>Decline</button>
        : null
      }
    </div>
  )
};

export default ApprovalCard;
