import React, { Component } from "react";
import Layout from "../../components/global/Layout";
import { FaAward } from "@react-icons/all-files/fa/FaAward";
import { IoIosHome } from "@react-icons/all-files/io/IoIosHome";
import { IoIosPeople } from "@react-icons/all-files/io/IoIosPeople";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiPlus } from "@react-icons/all-files/bi/Biplus";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <div className="main main--settings">
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
          <div className="control-panel">
            <h4 className="panel__title">Settings</h4>
            <div className="tabs">
              <div className="tabs__headers">
                <div className="tabs__header" id="tabhead-1">
                  General
                </div>
                <div className="tabs__header active" id="tabhead-2">
                  Classes
                </div>
                <div className="tabs__header" id="tabhead-3">
                  Treasure Box
                </div>
              </div>
              <div className="tabs__content-container">
                <div className="tabs__content" id="tabcontent-1">
                  <form className="settings-form">
                    <div className="settings-form__group">
                      <label
                        className="settings-form__label"
                        htmlFor="teacher-name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="settings-form__input-text"
                        id="name"
                        name="teacher-name"
                        aria-describedby="settings-form__helper-text__name"
                      />
                      <span
                        id="settings-form__helper-text__name"
                        className="settings-form__helper"
                      >
                        Update your First and Last Name
                      </span>
                    </div>

                    <div className="settings-form__group">
                      <label className="settings-form__label" htmlFor="name">
                        Username
                      </label>
                      <input
                        type="text"
                        className="settings-form__input-text"
                        id="name"
                        name="teacher-name"
                        aria-describedby="settings-form__helper-text__username"
                      />
                      <span
                        id="settings-form__helper-text__username"
                        className="settings-form__helper"
                      >
                        Update your First and Last Name
                      </span>
                    </div>

                    <div className="settings-form__group">
                      <label className="settings-form__label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="settings-form__input-text"
                        id="name"
                        name="teacher-name"
                        aria-describedby="settings-form__helper-text__name"
                      />
                      <span id="settings-form__helper-text__name">
                        Update your First and Last Name
                      </span>
                    </div>
                  </form>
                </div>
                <div className="tabs__content active" id="tabcontent-2">
                  <div className="utility-bar">
                    <AiOutlineSearch className="icon-search" />

                    <button className="list__btn">
                      <BiPlus className="icon-plus" />
                    </button>
                  </div>
                  <div className="class-settings">
                    <div className="class-settings__group">
                      <div className="class-settings__name">
                        <label className="settings-form__label">
                          Class #1 Name
                        </label>
                        <input
                          type="text"
                          className="settings-form__input-text"
                          id="class-name-1"
                          name="class-name-1"
                        />
                      </div>
                      <div className="class-settings__img">
                        <img
                          src="https://placekitten.com/g/200/200"
                          alt="placeholder"
                        ></img>
                        <button className="class-settings__delete">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="class-settings__group">
                      <div className="class-settings__name">
                        <label className="settings-form__label">
                          Class #2 Name
                        </label>
                        <input
                          type="text"
                          className="settings-form__input-text"
                          id="class-name-1"
                          name="class-name-1"
                        />
                      </div>
                      <div className="class-settings__img">
                        <img
                          src="https://placekitten.com/g/200/200"
                          alt="placeholder"
                        ></img>
                        <button className="class-settings__delete">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="class-settings__group">
                      <div className="class-settings__name">
                        <label className="settings-form__label">
                          Class #3 Name
                        </label>
                        <input
                          type="text"
                          className="settings-form__input-text"
                          id="class-name-1"
                          name="class-name-1"
                        />
                      </div>
                      <div className="class-settings__img">
                        <img
                          src="https://placekitten.com/g/200/200"
                          alt="placeholder"
                        ></img>
                        <button className="class-settings__delete">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="class-settings__group">
                      <div className="class-settings__name">
                        <label className="settings-form__label">
                          Class #4 Name
                        </label>
                        <input
                          type="text"
                          className="settings-form__input-text"
                          id="class-name-1"
                          name="class-name-1"
                        />
                      </div>
                      <div className="class-settings__img">
                        <img
                          src="https://placekitten.com/g/200/200"
                          alt="placeholder"
                        ></img>
                        <button className="class-settings__delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tabs__content" id="tabcontent-3">
                  <h4>Tab 3</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
              <div className="tabs__actions">
                <button className="tabs__action-save btn btn--settings">
                  Save Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;