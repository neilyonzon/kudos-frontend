import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import Approval from "./treasureBox/Approval";
import ApprovalCard from "./dashboard/ApprovalCard";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const Dashboard = (props) => {

  useEffect(() => {
    if(props.userType === 'teacher'){
      getDashboardData({
        variables: {
          classId: props.selectedClassId
        }
      })
    } else {
      getDashboardData()
    }
  }, [props.selectedClassId]);

  let GET_DASHBOARD
  if(props.userType === 'teacher'){
    GET_DASHBOARD = gql`
      query getClassDashboard($classId: Int!) {
        getClassInfo(classId: $classId) {
          className
          treasureBoxOpen
          students {
            id
            firstName
            lastName
            username
            imageUrl
            kudosBalance
            transactions {
              id
              approved
              prizeId
              prizeName
              prizeCost
              prizeImageUrl
            }
          }
          prizes {
            id
            name
            kudosCost
            quantity
          }
        }
      }
    `
  } else {
    GET_DASHBOARD = gql`
      query getStudentDashboard {
        student {
          kudosBalance
          classId
          wishList {
            id
            prizeAvailable
          }
          transactions {
            id
            approved
            prizeId
            prizeName
            prizeImageUrl
            prizeCost
          }
        }
      }
    `
  }

  const [getDashboardData, { loading, error, data }] = useLazyQuery(
    GET_DASHBOARD, 
    {
      fetchPolicy: "network-only"
    }
  ) 

  const studentListingData = {
    type: "studentsTeacherDash",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      { name: "Kudos", dataQuery: "kudosBalance" },
    ],
  }

  const prizesListingData = {
    type: "",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      { name: "Cost", dataQuery: "kudosCost" },
    ],
  }

  if (loading) {
    return (
      <div>
        <h2>...loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>there was an errooooooooor :(</h2>
      </div>
    );
  }

  // if no students, prompt teacher to add students
  // if(data && !data.getClassInfo.students){

  // }
  let numPendingApproval = 0
  let pendingApprovals = []
  if (props.userType === 'teacher' && data) {
    const classStudents = data.getClassInfo.students;
    
    for (const student of classStudents) {
      for (const transaction of student.transactions) {
        if (!transaction.approved) {
          numPendingApproval += 1;
          const studentName = student.firstName + " " + student.lastName;
          pendingApprovals.push(
            <Approval
              key={transaction.id}
              studentName={studentName}
              prizeCost={transaction.prizeCost}
              prizeName={transaction.prizeName}
            />
          );
        }
      }
    }

    let remainingPrizes = 0;
    for (const prize of data.getClassInfo.prizes) {
      remainingPrizes += prize.quantity;
    }

    return (
      <>
        <div className="panel dashboard-groups">
          <h4 className="panel__title">{data.getClassInfo.className}</h4>
          <Listing
            rows={classStudents}
            config={studentListingData}
            refreshData={getDashboardData}
          />
        </div>
        <div className="panel dashboard-panel-treasure">
          <h4 className="panel__title">Treasure Box</h4>
          <div className="panel__content">
            <GiOpenTreasureChest className="icon-treasure" /> 
            <div className="dashboard-panel-treasure__links">
              <p>
                <a href="#">{numPendingApproval} Pending Approvals</a>
              </p>
              <p>
                <a href="#">{remainingPrizes} Prizes Remaining</a>
              </p>
            </div>
          </div>
        </div>
        <div className="panel dashboard-lorem">
          <h4 className="panel__title">Lorem Ipsum</h4>
          <div className="panel__content">
            <p>{numPendingApproval} Pending Approvals</p>
          </div>
        </div>
      </>
    );
  }

  if(data){


    
    let approvedPurchases = []
    const studentTransactions = data.student.transactions
    for(const transaction of studentTransactions){
      if(transaction.approved){
        approvedPurchases.push(transaction)
      } else{
        numPendingApproval += 1
        pendingApprovals.push(transaction)
      }
    }

    //Filter this array by approved prizes only
    let allStudentsPrizes = data.student.transactions;
    let studentsPrizes = [];

    if (studentsPrizes.length > 0) {
      studentsPrizes = allStudentsPrizes.filter(transaction => transaction.approved == true);
    }

    console.log(studentsPrizes);

    const studentsWishes = [];

    if (data.student.wishList !== null ) {
      studentsWishes = data.student.wishList;
    }

    console.log(data.student);

    return (
      <>
        <div className="panel dashboard-prizes">
          <h4 className="panel__title">Your Prizes</h4>
          <Listing
            rows={studentsPrizes}
            config={prizesListingData}
            refreshData={getDashboardData}
          />
        </div>
        <div className="panel dashboard-panel-wishes">
          <h4 className="panel__title">Your Wishes</h4>
          <Listing
            rows={studentsWishes}
            config={prizesListingData}
            refreshData={getDashboardData}
          />
        </div>
        <div className="panel dashboard-panel-points">
          <h4 className="panel__title">Kudos Points</h4>
          <div className="panel__content">
            <GiOpenTreasureChest className="icon-treasure" /> 
            <div className="dashboard-panel-treasure__links">
              <p>
                <a href="#">{data.student.kudosBalance} Kudos Points Remaining</a>
              </p>
              {/* <p>
                <a href="#">{remainingPrizes} Prizes Remaining</a>
              </p> */}
            </div>
          </div>
        </div>
        <div className="panel dashboard-pending">
          <h4 className="panel__title">Approvals</h4>
          <div className="panel__content">
            <p><strong>{numPendingApproval} Pending Approvals</strong></p>
            <ApprovalCard/>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <h2>...loading...</h2>
    </div>
  );
};

export default Dashboard;
