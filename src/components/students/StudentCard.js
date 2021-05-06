import React from "react";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";

import studentCardStyles from "./studentCard.module.css";

const StudentCard = (props) => {
  return (
    <div className="list__item">
      <img className="list__img" src="https://placekitten.com/200/300"></img>
      <span className="list__col-name list__col-name--dash">{props.name}</span>
      <span className="ist__col-kudos list__col-kudos--dash">
        {props.kudosBalance}
      </span>
      <div className="list__col-btns">
        <button className="list__btn list__btn--pts">
          <FaDollarSign className="icon-pts" />
        </button>
        <button className="list__btn list__btn--edit">
          <FaEdit className="icon-edit" />
        </button>
      </div>
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
