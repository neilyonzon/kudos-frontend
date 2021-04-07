import React from 'react'
import { gql, useQuery } from '@apollo/client'

import StudentCard from './dashboard/StudentCard'
import TBSummary from './dashboard/TBSummary'

const Home = props =>{

    const GET_CLASS_DASHBOARD = gql`
        query getClassDashboard($classId: Int!){
            getClassInfo(classId: $classId){
                className
                treasureBoxOpen
                students{
                    id
                    firstName
                    lastName
                    username
                    imageUrl
                    kudosBalance
                    transactions{
                        id
                        approved
                        prizeId
                        prizeCost
                        prizeImageUrl
                    }
                }
                prizes{
                    id
                    name
                    kudosCost
                    quantity
                    category
                }
            }
        }
    `

    const { loading, error, data } = useQuery(GET_CLASS_DASHBOARD, {
        variables: { classId: props.selectedClassId }
    })

    if(loading){
        return (
            <div>
                <h2>...loading...</h2>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h2>there was an error :(</h2>
            </div>
        )
    }

    // if no students, prompt teacher to add students
    // if(data && !data.getClassInfo.students){

    // }

    const classStudents = data.getClassInfo.students
    let pendingApproval = 0
    for(const student of classStudents){
        for(const transaction of student.transactions){
            if(!transaction.approved){
                pendingApproval += 1
            }
        }
    }

    let remainingPrizes = 0
    for(const prize of data.getClassInfo.prizes){
        remainingPrizes += prize.quantity
    }

    return(
        <div>
            <h1>The home component is selected</h1>
            <h3>{pendingApproval} waiting to be approved</h3>
            <h3>{remainingPrizes} prizes remain</h3>
            {classStudents.map(student => {
                return <StudentCard key={student.id} name={student.firstName} kudosBalance={student.kudosBalance} />
            })}
        </div>
    )
}

export default Home;