import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";

const OverlaySelect = (props) => {
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
    <div class="list__overlay-select-container">
      <button className="list__btn">
        <IoEllipsisVerticalSharp />
      </button>
      <div class="list__overlay-select">
        <ul>{selectInput}</ul>
      </div>
    </div>
  );
};

export default OverlaySelect;
