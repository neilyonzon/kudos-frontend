import React, { useState } from 'react'
import Modal from 'react-modal'

import { gql, useMutation } from '@apollo/client'

import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt'
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus'
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus'

import Button from '../elements/Button'

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

const KudosModal = (props) => {

    const [editNumber, setEditNumber] = useState(0)

    const editHandler = (editType) => {
        if(editType === "add"){
            setEditNumber(editNumber + 1)
        } else {
            if(editNumber > 0){
                setEditNumber(editNumber - 1)
            }
        }
    }

    const EDIT_BALANCE = gql`
        mutation adjustKudosBalance($studentId: Int!, $adjustedBalance: Int!){
            adjustStudentBalance(adjustedBalanceData: { studentId: $studentId, newBalance: $adjustedBalance}){
                kudosBalance
            }
        }
    `

    const [editBalance] = useMutation(EDIT_BALANCE, {
        onCompleted(){
            props.refreshData()
        },
        onError(){
          console.log('unable to edit kudos balance!')  
        }
    })

    // probably want to add some checks here if subtracting points resulting
    // in negative kudos balance
    const editKudosHandler = async (editType, event) => {
        event.preventDefault()

        const editNumberInt = parseInt(editNumber)

        let adjustedKudosBalance
        if(editType === "add"){
            adjustedKudosBalance = props.studentKudos + editNumberInt
        } else {
            adjustedKudosBalance = props.studentKudos - editNumberInt
        }

        editBalance({
            variables: {
                studentId: props.studentId,
                adjustedBalance: adjustedKudosBalance
            }
        })

        props.onClose()
    }

    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            style={customStyles}
        >
            <div className="form__group form__group--points">
                <label className="form__label" htmlFor="points">
                Points
                </label>
                <p>{props.firstName + ' ' + props.lastName}</p>
                <p>{props.studentKudos}</p>
                <div className="form__points-control">
                    <AiOutlineMinus className="form__icon points-minus" aria-controls="points" onClick={() => editHandler("minus")} />
                    <input 
                        type="number"
                        value={editNumber}
                        min="0" 
                        className="form__input--points form__input"
                        onChange={(event) => setEditNumber(parseInt(event.target.value))}
                    />
                    <AiOutlinePlus className="form__icon points-plus" aria-controls="points" onClick={() => editHandler("add")} />
                </div>
                <div className="form__points-button test">
                     <Button btnColor="green" clicked={(event) => editKudosHandler("minus", event)}>
                        Subtract points
                    </Button>
                    <Button btnColor="green" clicked={(event) => editKudosHandler("add", event)}>
                        Add points
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default KudosModal