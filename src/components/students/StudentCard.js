import React, { useState } from "react";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";

import EditStudentCardModal from './EditStudentModal';

import studentCardStyles from "./studentCard.module.css";

const StudentCard = (props) => {

  const [openEditStudent, setOpenEditStudent] = useState(false)

  const handleEditStudentModal = () =>{
    setOpenEditStudent(!openEditStudent)
  }
  
  return (
    <div className="list__item">
      <img className="list__img" src="https://placekitten.com/200/300"></img>
      <span className="list__col-name list__col-name--dash">{props.studentData.firstName + ' ' + props.studentData.lastName}</span>
      <span className="ist__col-kudos list__col-kudos--dash">
        {props.studentData.kudosBalance}
      </span>
      <div className="list__col-btns">
        <button className="list__btn list__btn--pts">
          <FaDollarSign className="icon-pts" />
        </button>
        <button className="list__btn list__btn--edit" onClick={handleEditStudentModal}>
          <FaEdit className="icon-edit" />
        </button>
      </div>
      <EditStudentCardModal
        editStudent={openEditStudent}
        onCloseEditStudent={handleEditStudentModal}
        refreshData={props.refreshData}
        firstName={props.studentData.firstName}
        lastName={props.studentData.lastName}
        username={props.studentData.username}
      />
    </div>

    // <div className={studentCardStyles.studentCard}>
    //   <span>{props.name}</span>
    //   <span>{props.kudosBalance} pts.</span>
    //   <div className={studentCardStyles.iconArea}>
    //     <FiDollarSign />
    //     <HiPencilAlt />
    //   </div>
    // </div>
  );
};

export default StudentCard;
