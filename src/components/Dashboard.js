import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import ApprovalCard from "./dashboard/ApprovalCard";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

//Remove the below
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle"
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";

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
    type: "studentsPrizes",
    columns: [
      {
        name: "Name",
        dataQuery: "prizeName",
      },
      { name: "Cost", dataQuery: "prizeCost" },
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
            <ApprovalCard
              key={transaction.id}
              transactionId={transaction.id}
              studentName={studentName}
              prizeId={transaction.prizeId}
              prizeCost={transaction.prizeCost}
              prizeName={transaction.prizeName}
              refreshData={getDashboardData}
              classId={props.selectedClassId}
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
            <p><strong>{numPendingApproval} Pending Approvals</strong></p>
            <div className="approval-section">
              {pendingApprovals}
            </div>
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
        pendingApprovals.push(
          <ApprovalCard
            key={transaction.id}
            transactionId={transaction.id}
            prizeId={transaction.prizeId}
            prizeCost={transaction.prizeCost}
            prizeName={transaction.prizeName}
            refreshData={getDashboardData}
            student={true}
          />
        )
      }
    }

    console.log(data.student);

    //Filter this array by approved prizes only
    let allStudentsPrizes = data.student.transactions;
    let approvedPrizes = [];

    if (allStudentsPrizes.length > 0) {
      approvedPrizes = allStudentsPrizes.filter(transaction => transaction.approved == true);
    }

    const studentsWishes = [];

    if (data.student.wishList !== null ) {
      studentsWishes = data.student.wishList;
    }

    return (
      <>
        <div className="panel dashboard-prizes">
          <h4 className="panel__title">Your Prizes</h4>
          <Listing
            rows={allStudentsPrizes}
            config={prizesListingData}
            refreshData={getDashboardData}
          />
        </div>
        <div className="panel dashboard-panel-wishes">
          <h4 className="panel__title">Your Wishes</h4>
          {/* <Listing
            rows={studentsWishes}
            config={prizesListingData}
            refreshData={getDashboardData}
          /> */}
          <div class="list">
            <div class="list__top">
            <div class="list__header">
                <div class="list__col-img list__col"></div>
                <div class="list__col">Name <span class="icon list__header-icon"></span></div>
                <div class="list__col">Cost <span class="icon list__header-icon"></span></div>
            </div>
          <div class="list__action-btns">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="icon-search" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
          </div>
          </div>
            <div class="list__items-container">
              <div class="list__item">
                <div class="list__details">
                  <img class="list__img list__col" src="https://kudosrewards.s3.amazonaws.com/images/testimageurl" alt="squirtle3"/>
                  <span class="list__col">TreasureBox Open</span>
                  <span class="list__col">10</span>
                  </div>
                  <div class="list__col-btns">
                    <button class="list__btn"><FaExchangeAlt className="icon-pts"/></button>
                    <button class="list__btn"><AiFillCloseCircle className="icon-pts"/></button>
                  </div>
              </div>
              <div class="list__item">
                <div class="list__details">
                  <img class="list__img list__col" src="https://kudosrewards.s3.amazonaws.com/images/testimageurl" alt="squirtle3"/>
                  <span class="list__col">TreasureBox Closed</span>
                  <span class="list__col">10</span>
                  </div>
                  <div class="list__col-btns">
                    <button class="list__btn btn--inactive"><FaExchangeAlt className="icon-pts"/></button>
                    <button class="list__btn"><AiFillCloseCircle className="icon-pts"/></button>
                  </div>
              </div>
            </div>
          </div>
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
            <div className="approval-section">
              {pendingApprovals}
            </div>
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
