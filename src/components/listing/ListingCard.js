import React, { useState } from "react";
import ListingCard from "./ListingCard";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";

const ListingCard = (props) => {
  return (
    <>
      <div className="list__item">
        <input type="checkbox" className="list__checkbox"></input>
        <div className="list__details">
          <img
            className="list__img list__col"
            src="https://placekitten.com/200/300"
          ></img>
          <span className="list__col list__col--lg">Matthew John</span>
          <span className="list__col">209 pts</span>
        </div>
        <div className="list__col-btns">
          <button className="list__btn list__btn--pts">
            <FaDollarSign className="icon-pts" />
          </button>
          <button className="list__btn list__btn--edit">
            <FaEdit className="icon-edit" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListingCard;
