import React, { Component } from 'react'
import StudentCard from './dashboard/StudentCard'
import TBSummary from './dashboard/TBSummary'

class Home extends Component {
    
    render(){
        console.log('meeeeep')
        console.log(this.props.data)

        const classStudents = this.props.data.students;
        let pendingApproval = 0;
        for(const student of classStudents){
            for(const transaction of student.transactions){
                if(!transaction.approved){
                    pendingApproval += 1
                }
            }
        }

        let remainingPrizes = 0;
        for(const prize of this.props.data.prizes){
            remainingPrizes += prize.quantity
        }
        
        return (
            <div>
                <h1>This is the home component</h1>
                {this.props.data.students.map(student => {
                    return <StudentCard key={student.studentId} name={student.firstName} kudosBalance={student.kudosBalance}/>
                })}
                <TBSummary remainingPrizes={remainingPrizes} pendingApproval={pendingApproval} />
            </div>
        )
    }
}

export default Home;