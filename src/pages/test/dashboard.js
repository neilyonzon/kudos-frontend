import React, { Component } from "react";
import Layout from "../../components/global/Layout";
import { FaAward } from "@react-icons/all-files/fa/FaAward";
import { IoIosHome } from "@react-icons/all-files/io/IoIosHome";
import { IoIosPeople } from "@react-icons/all-files/io/IoIosPeople";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiOutlineLock } from "@react-icons/all-files/ai/AiOutlineLock";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <div className="main">
          <div className="message-banner">
            <h1>Welcome Back Oscar Cano</h1>
          </div>
          <nav className="control-nav">
            <ul>
              <li className="control-nav__item selected">
                {" "}
                <IoIosHome />
              </li>
              <li className="control-nav__item">
                <IoIosPeople />
              </li>
              <li className="control-nav__item">
                {" "}
                <FaAward />
              </li>
              <li className="control-nav__item">
                <IoIosSettings />
              </li>
            </ul>
          </nav>
          <div className="control-panel dashboard">
            <div className="utility-bar">
              <div className="class-chooser select">
                <select>
                  <option value="class-204">Class 204</option>
                  <option value="ymca-tutoring">YMCA Tutoring</option>
                  <option value="manage">Manage Classes</option>
                </select>
              </div>
              <AiOutlineLock className="treasure-lock" />
            </div>
            <div className="panel dashboard-groups">
              <h4 className="panel__title">Class 203</h4>
              <div className="list">
                <div className="list__top">
                  <div className="list__header">
                    <div className="list__col-img list__col" />
                    <div className="list__col list__col--lg">
                      Name <span class="icon list__header-icon"></span>
                    </div>
                    <div className="list__col">
                      Kudos <span className="icon list__header-icon"></span>
                    </div>
                  </div>
                  <div className="list__action-btns">
                    <AiOutlineSearch className="icon-search" />
                  </div>
                </div>
                <div className="list__items-container">
                  <div className="list__item">
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                    <div className="list__details">
                      <img
                        className="list__img list__col"
                        src="https://placekitten.com/200/300"
                      ></img>
                      <span className="list__col list__col--lg">
                        Matthew John
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
                </div>
              </div>
            </div>
            <div className="panel dashboard-panel-treasure">
              <h4 className="panel__title">Treasure Box</h4>
              <div className="panel__content">
                <GiOpenTreasureChest className="icon-treasure" />
                <div className="dashboard-panel-treasure__links">
                  <p>
                    <a href="#">29 Remaining</a>
                  </p>
                  <p>
                    <a href="#">23 Pending Approvals</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="panel dashboard-lorem">
              <h4 className="panel__title">Lorem Ipsum</h4>
              <div className="panel__content">
                <p>29 Remaining</p>
                <p>23 Pending Approvals</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
