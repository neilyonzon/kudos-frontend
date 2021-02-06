import React from 'react'
import { FiDollarSign } from '@react-icons/all-files/fi/FiDollarSign'
import { HiPencilAlt } from '@react-icons/all-files/hi/HiPencilAlt'

import studentCardStyles from './studentCard.module.css'

const StudentCard = props => {
    return (
        <div className={studentCardStyles.studentCard}>
            <span>
                {props.name}
            </span>
            <span>
                {props.kudosBalance} pts.
            </span>
            <div className={studentCardStyles.iconArea}>
                <FiDollarSign />
                <HiPencilAlt />
            </div>
        </div>
    )
};

export default StudentCard;