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
        transform: "translate(-50%, -50%)"
    },
};

const DeleteCatModal = props => {

    let displayCategories = []
    props.categories.forEach(category => {
        if(category.category !== props.toDeleteCategory.category){
            displayCategories.push({ value: category.category, displayValue: category.category})
        }
    })

    const inputConfig = {
        type: "text",
        placeholder: "Category",
        options: displayCategories
    }

    const labelConfig = {
        dnisplay: false,
        label: "Category",
    }

    const [replaceCategory, setReplaceCategory] = useState(null)

    const DELETE_CAT = gql`
        mutation deleteCategory($id: Int!, $replaceId: Int!){
            deleteCategory(categoryInput: { id: $id, replaceId: $replaceId }){
            id
            }
        }
    `

    const [delete_category] = useMutation(DELETE_CAT, {
    onCompleted(){
        props.loadUserInfo()
    },
    onError(){
        console.log("could not delete category")
    }
    })

    const replaceCategoryHandler = (event) => {
        setReplaceCategory(event.target.value)
    }

    const deleteCatHandler = () => {
        const replaceCategoryId = props.categories.filter(category => category.category === replaceCategory)[0].id
        // console.log('replaceCatId', replaceCategoryId)
        delete_category({
            variables: {
                id: props.toDeleteCategory.id,
                replaceId: replaceCategoryId
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
                <h2>Delete Category: {props.toDeleteCategory.category}?</h2>
                <p>Replace all prizes with this category with:</p>
                <Input
                    inputType={"select"}
                    inputConfig={inputConfig}
                    labelConfig={labelConfig}
                    helper={"Category"}
                    value={replaceCategory}
                    changed={(event) => replaceCategoryHandler(event)}
                />
                <Button
                    btnColor="red"
                    clicked={deleteCatHandler}
                >
                    Delete Category
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteCatModal;