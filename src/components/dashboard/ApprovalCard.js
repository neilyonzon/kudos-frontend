import React, { useState } from "react";

import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiWish } from "@react-icons/all-files/si/SiWish";


const ApprovalCard = (props) => {
  return (
  <div className="approval-card">
    <span>You requested to <FaExchangeAlt/> 50 pts for a Pikachu Plush</span>
  </div>
  )
};

export default ApprovalCard;
