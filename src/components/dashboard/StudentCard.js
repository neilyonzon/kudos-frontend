import React from 'react'
import { FiDollarSign } from '@react-icons/all-files/fi/FiDollarSign'
import { HiPencilAlt } from '@react-icons/all-files/hi/HiPencilAlt'

import studentCardStyles from './studentCard.module.css'

const StudentCard = props => {
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.kudosBalance}</h2>
            <FiDollarSign />
            <HiPencilAlt />
        </div>
    )
};

export default StudentCard;