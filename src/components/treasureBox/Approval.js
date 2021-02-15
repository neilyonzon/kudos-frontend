import React from 'react'

import { GrTransaction } from '@react-icons/all-files/gr/GrTransaction'

const Approval = props => {
    return (
        <div>
            <span>{props.studentName} requested to <GrTransaction /> {props.prizeCost}pts for {props.prizeName}</span>
        </div>
    )
};

export default Approval