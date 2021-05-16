import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import StudentCard from "./students/StudentCard";
import TBSummary from "./dashboard/TBSummary";
import Approval from "./treasureBox/Approval";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const Dashboard = (props) => {
  const [listingData, setClassData] = useState({
    type: "dashboardTeacher",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      { name: "Kudos", dataQuery: "kudosBalance" },
    ],
    data: null,
  });

  const GET_CLASS_DASHBOARD = gql`
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
          category
        }
      }
    }
  `;

  useEffect(() => {
    getClassData();
  }, []);

  const [getClassData, { loading, error, data }] = useLazyQuery(
    GET_CLASS_DASHBOARD,
    {
      variables: { classId: props.selectedClassId },
      fetchPolicy: "network-only",
    }
  );

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
        <h2>there was an error :(</h2>
      </div>
    );
  }

  // if no students, prompt teacher to add students
  // if(data && !data.getClassInfo.students){

  // }

  if (data) {
    const classStudents = data.getClassInfo.students;
    let numPendingApproval = 0;
    let pendingApprovals = [];
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
          {/* <div className="list list--dash">
            <div className="list__header list__header--dash">
              <div className="list__col-img list__header-item" />
              <div className="list__col-name list__col-name--dash list__header-item">
                Name <span className="icon list__header-icon"></span>
              </div>
              <div className="list__col-kudos list__col-kudos--dash list__header-item">
                Kudos <span className="icon list__header-icon"></span>
              </div>
              <div className="list__search icon-search">
                <AiOutlineSearch className="icon-search" />
              </div>
            </div>
            <div className="list__items-container list__items-container--dash">
              {classStudents.map((student) => {
                return (
                  <StudentCard
                    key={student.id}
                    studentData={student}
                    refreshData={getClassData}
                  />
                );
              })}
            </div>
          </div> */}
          <Listing />
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
        {/* {classStudents.map((student) => {
          return (
            <StudentCard
              key={student.id}
              name={student.firstName}
              kudosBalance={student.kudosBalance}
            />
          );
        })} */}
      </>
    );
  }

  return (
    <div>
      <h2>...loading...</h2>
    </div>
  );
};

export default Dashboard;
