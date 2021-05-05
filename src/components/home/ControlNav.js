import React from "react";

import { FaAward } from "@react-icons/all-files/fa/FaAward";
import { IoIosHome } from "@react-icons/all-files/io/IoIosHome";
import { IoIosPeople } from "@react-icons/all-files/io/IoIosPeople";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";

import controlPanelStyles from "./controlPanel.module.css";

const ControlNav = (props) => {
  return (
    <nav className="control-nav">
      <ul>
        <li
          onClick={() => props.onSelectTab("Dashboard")}
          className={
            props.selectedTab === "Dashboard"
              ? "control-nav__item selected"
              : "control-nav__item"
          }
        >
          <IoIosHome />
        </li>
        <li
          onClick={() => props.onSelectTab("Students")}
          className={
            props.selectedTab === "Students"
              ? "control-nav__item selected"
              : "control-nav__item"
          }
        >
          <IoIosPeople />
        </li>
        <li
          onClick={() => props.onSelectTab("TreasureBox")}
          className={
            props.selectedTab === "TreasureBox"
              ? "control-nav__item selected"
              : "control-nav__item"
          }
        >
          <FaAward />
        </li>
        <li
          onClick={() => props.onSelectTab("Settings")}
          className={
            props.selectedTab === "Settings"
              ? "control-nav__item selected"
              : "control-nav__item"
          }
        >
          <IoIosSettings />
        </li>
      </ul>
    </nav>
  );
};

export default ControlNav;
