import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";

const OverlaySelect = (props) => {
  const [overlayClass, setOverlayState] = useState({
    class: "",
  });

  const toggleOverlaySelect = () => {
    console.log("hi");
    overlayClass.class === ""
      ? setOverlayState({ class: "list__overlay-select--active" })
      : setOverlayState({ class: "" });
  };

  let selectInput = "";
  props.type === "students"
    ? (selectInput = (
        <>
          <li className="list__overlay-select-item">
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
          <li className="list__overlay-select-item">
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
      <div class={"list__overlay-select " + overlayClass.class}>
        <ul>{selectInput}</ul>
      </div>
    </div>
  );
};

export default OverlaySelect;
