import React, { Component } from "react";
import Layout from "../../components/global/Layout";
import { FaAward } from "@react-icons/all-files/fa/FaAward";
import { IoIosHome } from "@react-icons/all-files/io/IoIosHome";
import { IoIosPeople } from "@react-icons/all-files/io/IoIosPeople";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";

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
            <div className="panel dashboard-groups">
              <h4 className="panel__title">Your Groups</h4>
              <div className="select">
                <select>
                  <option value="class-204">Class 204</option>
                  <option value="ymca-tutoring">YMCA Tutoring</option>
                  <option value="manage">Manage Classes</option>
                </select>
              </div>
              <div className="list list--dash">
                <div className="list__header list__header--dash">
                  <div className="list__col-img list__header-item" />
                  <div className="list__col-name list__col-name--dash list__header-item">
                    Name <span class="icon list__header-icon"></span>
                  </div>
                  <div className="list__col-kudos list__col-kudos--dash list__header-item">
                    Kudos <span className="icon list__header-icon"></span>
                  </div>
                  <div className="list__search icon-search">
                    <AiOutlineSearch className="icon-search" />
                  </div>
                </div>
                <div className="list__items-container list__items-container--dash">
                  <div className="list__item">
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
                    <img
                      className="list__img"
                      src="https://placekitten.com/200/300"
                    ></img>
                    <span className="list__col-name list__col-name--dash">
                      Jerry Lee
                    </span>
                    <span className="ist__col-kudos list__col-kudos--dash">
                      209 pts
                    </span>
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
