import React from 'react'

const TBSummary = props =>{

    return(
        <div>
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