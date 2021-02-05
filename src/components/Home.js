import React, { Component } from 'react'
import StudentCard from './dashboard/StudentCard'

class Home extends Component {
    
    render(){
        console.log('meeeeep')
        console.log(this.props.data)

        return (
            <div>
                <h1>This is the home component</h1>
                {this.props.data.students.map(student => {
                    return <StudentCard key={student.studentId} name={student.firstName} kudosBalance={student.kudosBalance}/>
                })}
            </div>
        )
    }
}

export default Home;