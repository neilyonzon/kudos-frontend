import React from 'react'

import tbSummaryStyling from './tbSummary.module.css'

import { FaMoneyBillAlt } from '@react-icons/all-files/fa/FaMoneyBillAlt'

const TBSummary = props =>{

    return(
        <div>
            <div className={ tbSummaryStyling.moneyIcon }>
                <FaMoneyBillAlt />
            </div>
            <div>
                {props.remainingPrizes} remaining
            </div>
            <div>
                {props.pendingApproval} pending approval
            </div>
            
        </div>
    )
}

export default TBSummary;