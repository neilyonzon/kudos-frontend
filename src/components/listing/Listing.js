import React from "react";
import { gql, useQuery } from "@apollo/client";

import StudentCard from "./students/StudentCard";
import ListingCard from "./ListingCard";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";

const Listing = (props) => {
  const { loading, error, data } = useQuery(GET_CLASS_DASHBOARD, {
    variables: { classId: props.selectedClassId },
  });

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

  return (
    <>
      <div className="list">
        <div className="list__top">
          <div className="list__header">
            <div className="list__col-img list__col" />
            <div className="list__col list__col--lg">
              Name <span className="icon list__header-icon"></span>
            </div>
            <div className="list__col">
              Kudos <span className="icon list__header-icon"></span>
            </div>
          </div>
          <div className="list__action-btns">
            <AiOutlineSearch className="icon-search" />
            <FaDollarSign className="icon-pts" />
            <IoEllipsisVerticalSharp />
          </div>
        </div>
        <div className="list__items-container">
          <div className="list__item">
            <input
              type="checkbox"
              className="list__checkbox"
              id="student"
            ></input>
            <div className="list__details">
              <img
                className="list__img list__col"
                src="https://placekitten.com/200/300"
              ></img>
              <span className="list__col list__col--lg">
                Jennifer Roxas Lee
              </span>
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
        </div>
      </div>
    </>
  );
};

export default Listing;
