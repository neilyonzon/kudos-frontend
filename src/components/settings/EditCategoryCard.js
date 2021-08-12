import React, { useState } from 'react'
import DeleteCatModal from './DeleteCatModal'

const EditCategoryCard = props => {

    const [deleteCatModalOpen, setDeleteCatModalOpen] = useState(false)

    const openDeleteClassModal = () => setDeleteCatModalOpen(true)
    const closeDeleteClassModal = () => setDeleteCatModalOpen(false)

    return (
        <div className="categories-settings__group">
            <label className="settings-form__label">
                {props.item.category === "Toy" ? `${props.item.category} (Default)` : props.item.category}
            </label>
            
            {props.item.category !== "Toy" ? 
            <>
                <input
                    type="text"
                    className="settings-form__input-text"
                    id={props.item.category}
                    value={props.item.category}
                    onChange={e => props.onChange(e, props.index)}
                />
                <button onClick={openDeleteClassModal}>Delete</button>
            </>
            : null
            }
            <DeleteCatModal 
                isOpen={deleteCatModalOpen}
                onClose={closeDeleteClassModal}
                toDeleteCategory={props.item}
                categories={props.categories}
                loadUserInfo={props.loadUserInfo}
            />
        </div>
    )
}

export default EditCategoryCard