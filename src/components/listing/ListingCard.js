import React, { useState } from "react";

import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiWish } from "@react-icons/all-files/si/SiWish";

import KudosModal from "../students/KudosModal";
import StudentModal from "../students/StudentModal";
import PrizeModal from "../treasureBox/PrizeModal";
import ActionModal from '../treasureBox/ActionModal';

const ListingCard = (props) => {
  const [openEditKudos, setOpenEditKudos] = useState(false);
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [openEditPrize, setOpenEditPrize] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openWish, setOpenWish] = useState(false);

  let hasEnoughKudos
  if(props.type === 'treasureBox'){
    hasEnoughKudos = props.itemData.kudosCost <= props.kudosBalance
  }

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

  const handleActionModal = (actionType) => {
    if(!hasEnoughKudos || actionType === 'wish'){
      setOpenWish(!openWish)
    } else {
      setOpenTransaction(!openTransaction)
    }
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
      } 
      else if(data === "category[category]"){
        query = props.itemData.category.category
      }else {
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
              <FaExchangeAlt className="icon-pts" onClick={() => handleActionModal('transaction')} />
            </button>
            <button className="list__btn">
              <SiWish className="icon-pts" onClick={() => handleActionModal('wish')} />
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
        category={props.itemData.category ? props.itemData.category.category : ''}
        description={props.itemData.description}
        imageUrl={props.itemData.imageUrl}
        categories={props.categories}
      />
      <ActionModal 
        isOpen={openTransaction}
        onClose={() => handleActionModal('transaction')}
        refreshData={props.refreshData}
        id={props.itemData.id}
        prizename={props.itemData.name}
        kudoscost={props.itemData.kudosCost}
        imageUrl={props.itemData.imageUrl}
        actionType={'transaction'}
      />
      <ActionModal 
        isOpen={openWish}
        onClose={() => handleActionModal('wish')}
        refreshData={props.refreshData}
        id={props.itemData.id}
        prizename={props.itemData.name}
        kudoscost={props.itemData.kudosCost}
        imageUrl={props.itemData.imageUrl}
        actionType={'wish'}
        hasEnoughKudos={hasEnoughKudos}
        kudosBalance={props.kudosBalance}
      />
    </div>
  );
};

export default ListingCard;
