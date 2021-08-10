import React, { useState } from 'react'

import DeleteClassModal from "./DeleteClassModal"

const EditClassCard = props => {

    const [deleteClassModalOpen, setDeleteClassModalOpen] = useState(false)

    const openDeleteClassModal = () => setDeleteClassModalOpen(true)

    const closeDeleteClassModal = () => setDeleteClassModalOpen(false)

    return (
        <div className="class-settings__group">
            <div className="class-settings__name">
                <label className="settings-form__label">Edit class name:</label>
                <input
                    type="text"
                    className="settings-form__input-text"
                    id={`class-name-${props.index}`}
                    name={`class-name-${props.index}`}
                    value={props.item.className}
                    onChange={(e) => props.onChange(e, props.index)}
                />
            </div>
            <div className="class-settings__img">
                <img
                    src={props.item.imageUrl}
                    alt={props.item.className}
                ></img>
                <button className="class-settings__delete" onClick={openDeleteClassModal}>Delete</button>
            </div>
            <DeleteClassModal
                isOpen = {deleteClassModalOpen}
                onClose={closeDeleteClassModal}
                loadUserInfo={props.loadUserInfo}
                classId={props.item.id}
                className={props.item.className}
            />
        </div>
    )
}

export default EditClassCard