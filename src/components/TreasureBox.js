import React, { Component } from 'react';

import Approval from './treasureBox/Approval'

class TreasureBox extends Component {
    
    render(){

        //array of student objects
        const students = this.props.data.students
        const pendingApproval = []
        for(const student of students){
            if(student.transactions.length > 0){

                const studentName = student.firstName + ' ' +  student.lastName

                for(const transaction of student.transactions){

                    pendingApproval.push(<Approval 
                        key={transaction.id} 
                        studentName={studentName} 
                        studentUrl={student.imageUrl}
                        prizeName={transaction.prizeName} 
                        prizeCost={transaction.prizeCost}
                        prizeUrl={transaction.prizeImageUrl}/>
                    )
                }
            }
        }

        return (
            <div>
                <h2>Approvals</h2>
                <span>{pendingApproval.length} pending approval</span>
                {pendingApproval}
            </div>
        )
    }
}

export default TreasureBox;