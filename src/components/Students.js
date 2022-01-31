import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Listing from "../components/listing/Listing";
import StudentModal from "./students/StudentModal";
import Button from "./elements/Button";

const Students = (props) => {
  const listingData = {
    type: "students",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      { name: "Kudos", dataQuery: "kudosBalance" },
    ],
  };

  const [openAddStudent, setOpenAddStudent] = useState(false);

  const handleAddStudentModal = () => {
    setOpenAddStudent(!openAddStudent);
  };

  const GET_CLASS_DASHBOARD = gql`
    query getClassDashboard($classId: Int!) {
      getClassInfo(classId: $classId) {
        className
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

  if (data) {
    const classStudents = data.getClassInfo.students;

    if (classStudents.length === 0) {
      return <div className="treasure-box__container">
      <h2>Add your first student for {data.getClassInfo.className}</h2>
      <Button clicked={handleAddStudentModal} btnColor="green">Add Student</Button>
      <StudentModal
        addStudent={true}
        isOpen={openAddStudent}
        onClose={handleAddStudentModal}
        refreshData={getClassData}
        classId={props.selectedClassId}
      />
      </div>
    }

    return (
      <>
        <div className="panel">
          <h4 className="panel__title">{data.getClassInfo.className}</h4>
          <Listing
            rows={classStudents}
            config={listingData}
            refreshData={getClassData}
            classId={props.selectedClassId}
            userType={props.userType}
          />
        </div>
      </>
    );
  }

  

  return (
    <div>
      <h2>...loading...</h2>
    </div>
  );
};

export default Students;
