import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";

import StudentModal from "../students/StudentModal";
import PrizeModal from "../treasureBox/PrizeModal";

const OverlaySelect = (props) => {
  const [overlayClass, setOverlayState] = useState({
    class: "",
  });

  const [openAddStudent, setOpenAddStudent] = useState(false);

  const [openAddPrize, setOpenAddPrize] = useState(false);

  const toggleOverlaySelect = () => {
    overlayClass.class === ""
      ? setOverlayState({ class: "list__overlay-select--active" })
      : setOverlayState({ class: "" });
  };

  const handleAddStudentModal = () => {
    setOpenAddStudent(!openAddStudent);
  };

  const handleAddPrizeModal = () => {
    setOpenAddPrize(!openAddPrize);
  };

  let selectInput = "";
  props.type === "students"
    ? (selectInput = (
        <>
          <li
            className="list__overlay-select-item"
            onClick={handleAddStudentModal}
          >
            <a href="#">Add Students</a>
            <BiPlus />
          </li>
          <li className="list__overlay-select-item">
            <a href="#">Delete Students</a>
            <BiMinus />
          </li>
        </>
      ))
    : (selectInput = (
        <>
          <li
            className="list__overlay-select-item"
            onClick={handleAddPrizeModal}
          >
            <a href="#">Add Prizes</a>
            <BiPlus />
          </li>
          <li className="list__overlay-select-item">
            <a href="#">Delete Prizes</a>
            <BiMinus />
          </li>
        </>
      ));

  return (
    <div className="list__overlay-select-container">
      <button className="list__btn" onClick={toggleOverlaySelect}>
        <IoEllipsisVerticalSharp />
      </button>
      <div className={"list__overlay-select " + overlayClass.class}>
        <ul>{selectInput}</ul>
      </div>
      <StudentModal
        addStudent={true}
        isOpen={openAddStudent}
        onClose={handleAddStudentModal}
        refreshData={props.refreshData}
        classId={props.classId}
      />
      <PrizeModal
        addPrize={true}
        isOpen={openAddPrize}
        onClose={handleAddPrizeModal}
        refreshData={props.refreshData}
        classId={props.classId}
        categories={props.categories}
      />
    </div>
  );
};

export default OverlaySelect;
