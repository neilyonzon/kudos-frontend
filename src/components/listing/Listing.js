import React from "react";
import { gql, useQuery } from "@apollo/client";

import ListingCard from "./ListingCard";
import OverlaySelect from "./OverlaySelect";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { BsFillGridFill } from "@react-icons/all-files/bs/BsFillGridFill";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";

const Listing = (props) => {
  const listingHeader = (columnsData) => {
    return columnsData.map((column) => {
      return (
        <div className="list__col" key={column.name}>
          {column.name} <span className="icon list__header-icon"></span>
        </div>
      );
    });
  };

  return (
    <>
      <div className="list">
        <div className="list__top">
          <div className="list__header">
            <div className="list__col-img list__col" />
            {listingHeader(props.config.columns)}
          </div>
          <div className="list__action-btns">
            <AiOutlineSearch className="icon-search" />

            {props.config.type == "students" ? (
              <FaDollarSign className="icon-pts" />
            ) : null}

            {props.userType && (props.config.type == "students" ||
            props.config.type == "prizes") ? (
              <OverlaySelect type={props.config.type} refreshData={props.refreshData} classId={props.classId}/>
            ) : null}

            {props.config.type == "treasureBox" ? <BsFillGridFill /> : null}
          </div>
        </div>
        <div className="list__items-container">
          {props.rows.map((item) => {
            return (
              <ListingCard
                key={item.id}
                itemData={item}
                columns={props.config.columns}
                refreshData={props.refreshData}
                type={props.config.type}
                kudosBalance={props.kudosBalance}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Listing;
