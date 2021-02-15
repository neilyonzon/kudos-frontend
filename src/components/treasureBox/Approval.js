import React from 'react'

import { GrTransaction } from '@react-icons/all-files/gr/GrTransaction'

const Approval = props => {
    return (
        <div>
            <span>{props.studentName} requested to <GrTransaction /> *points* for {props.prizeName}</span>
        </div>
    )
};

export default Approval