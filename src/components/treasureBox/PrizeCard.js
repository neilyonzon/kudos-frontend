import React from 'react'

import { HiPencilAlt } from '@react-icons/all-files/hi/HiPencilAlt'

const PrizeCard = props => {
    return (
        <div>
            <span>
                {props.name}
            </span>
            <span>
                {props.quantity}
            </span>
            <span>
                {props.cost} pts
            </span>
            <span>
                {props.category}
            </span>
            <span>
                <HiPencilAlt />
            </span>
        </div>
    )
}

export default PrizeCard;