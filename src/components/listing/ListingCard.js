import React, { useState } from "react";

import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiWish } from "@react-icons/all-files/si/SiWish";

import KudosModal from "../students/KudosModal";
import StudentModal from "../students/StudentModal";
import PrizeModal from "../treasureBox/PrizeModal";
import TransactionModal from '../treasureBox/TransactionModal';

const ListingCard = (props) => {
  const [openEditKudos, setOpenEditKudos] = useState(false);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [openEditPrize, setOpenEditPrize] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

  const handleEditKudosModal = () => {
    if (props.type === "studentsTeacherDash" || props.type === "students") {
      setOpenEditKudos(!openEditKudos);
    } else {
      alert("Not complete for this type");
    }
  };

  const handleEditModal = () => {
    if (props.type === "studentsTeacherDash" || props.type === "students") {
      setOpenEditStudent(!openEditStudent);
    } else if (props.type === "prizes") {
      setOpenEditPrize(!openEditPrize);
    } else {
      alert("Not complete for this type");
    }
  };

  const handleTransactionModal = () => {
    setOpenTransaction(!openTransaction)
  }

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
          src={props.itemData.imageUrl}
        ></img>
        {getItemColumns(props.columns)}
      </div>
      <div className="list__col-btns">
        {props.type == "students" || props.type == "studentsTeacherDash" ? (
          <button className="list__btn list__btn--pts">
            <FaDollarSign className="icon-pts" onClick={handleEditKudosModal} />
          </button>
        ) : null}

        {props.type == "treasureBox" ? (
          <>
            <button className="list__btn">
              <FaExchangeAlt className="icon-pts" onClick={handleTransactionModal}/>
            </button>
            <button className="list__btn">
              <SiWish className="icon-pts" />
            </button>
          </>
        ) : null}

        {props.type !== "treasureBox" ? (
          <button className="list__btn list__btn--edit">
            <FaEdit className="icon-edit" onClick={handleEditModal} />
          </button>
        ) : null}
      </div>
      <KudosModal
        isOpen={openEditKudos}
        onClose={handleEditKudosModal}
        refreshData={props.refreshData}
        studentId={props.itemData.id}
        firstName={props.itemData.firstName}
        lastName={props.itemData.lastName}
        studentKudos={props.itemData.kudosBalance}
      />
      <StudentModal
        isOpen={openEditStudent}
        onClose={handleEditModal}
        refreshData={props.refreshData}
        id={props.itemData.id}
        firstName={props.itemData.firstName}
        lastName={props.itemData.lastName}
        username={props.itemData.username}
        imageUrl={props.itemData.imageUrl}
      />
      <PrizeModal
        isOpen={openEditPrize}
        onClose={handleEditModal}
        refreshData={props.refreshData}
        id={props.itemData.id}
        edit={true}
        prizename={props.itemData.name}
        kudoscost={props.itemData.kudosCost}
        quantity={props.itemData.quantity}
        category={props.itemData.category}
        description={props.itemData.description}
        imageUrl={props.itemData.imageUrl}
      />
      <TransactionModal 
        isOpen={openTransaction}
        onClose={handleTransactionModal}
        refreshData={props.refreshData}
        id={props.itemData.id}
        prizename={props.itemData.name}
        kudoscost={props.itemData.kudosCost}
        imageUrl={props.itemData.imageUrl}
      />
    </div>
  );
};

export default ListingCard;
