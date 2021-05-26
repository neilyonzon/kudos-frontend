import React, { useState } from "react";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import StudentModal from "../students/StudentModal";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiWish } from "@react-icons/all-files/si/SiWish";

const ListingCard = (props) => {
  const [openEditStudent, setOpenEditStudent] = useState(false);

  const handleEditStudentModal = () => {
    if (props.type === "studentsTeacherDash" || props.type === "students") {
      setOpenEditStudent(!openEditStudent);
    } else {
      alert("Not complete for this type");
    }
  };

  const getItemColumns = (columnsData) => {
    const columns = columnsData.map((column) => {
      const data = column.dataQuery;
      let query = null;
      if (
        (data == "name" && props.type === "studentsTeacherDash") ||
        (data == "name" && props.type == "students")
      ) {
        query = props.itemData.firstName + " " + props.itemData.lastName;
      } else {
        query = props.itemData[data];
      }

      return (
        <span className="list__col" key={column.dataQuery}>
          {query}
        </span>
      );
    });
    return columns;
  };

  return (
    <div className="list__item">
      <input type="checkbox" className="list__checkbox"></input>
      <div className="list__details">
        <img
          className="list__img list__col"
          src="https://placekitten.com/200/300"
        ></img>
        {getItemColumns(props.columns)}
      </div>
      <div className="list__col-btns">
        {props.type == "students" || props.type == "studentsTeacherDash" ? (
          <button className="list__btn list__btn--pts">
            <FaDollarSign className="icon-pts" />
          </button>
        ) : null}

        {props.type == "treasureBox" ? (
          <>
            <button className="list__btn">
              <FaExchangeAlt className="icon-pts" />
            </button>
            <button className="list__btn">
              <SiWish className="icon-pts" />
            </button>
          </>
        ) : null}

        {props.type !== "treasureBox" ? (
          <button className="list__btn list__btn--edit">
            <FaEdit className="icon-edit" onClick={handleEditStudentModal} />
          </button>
        ) : null}
      </div>
      <StudentModal
        isOpen={openEditStudent}
        onClose={handleEditStudentModal}
        refreshData={props.refreshData}
        id={props.itemData.id}
        firstName={props.itemData.firstName}
        lastName={props.itemData.lastName}
        username={props.itemData.username}
      />
    </div>
  );
};

export default ListingCard;
