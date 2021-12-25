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
                <div className="tabs__header" id="tabhead-2">
                  Classes
                </div>
                <div className="tabs__header active" id="tabhead-3">
                  Categories
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
                <div className="tabs__content" id="tabcontent-2">
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
                  </div>
                </div>
                <div className="tabs__content active" id="tabcontent-3">
                  <div className="utility-bar utility-bar--space-between utility-bar--transactions">
                    <div class="utility-bar__dropdowns">
                      <div class="class-selector select">
                        <select>
                          <option value="Class 101">Class 101</option>
                          <option value="Class 102">Class 102</option>
                          <option value="Class 103">Class 103</option>
                          <option value="Class 105">Class 105</option>
                        </select>
                      </div>
                      <div class="class-selector select">
                        <select>
                          <option value="Class 101">October 2021</option>
                          <option value="Class 102">September 2021</option>
                          <option value="Class 103">August 2021</option>
                        </select>
                      </div>
                    </div>
                    <AiOutlineSearch className="icon-search" />
                  </div>
                  <div className="transactions">
                    <div className="transactions__group">
                      <p>
                        Kate Mendoza exchanged 50pts for{" "}
                        <a href="#">Pikachu Plush</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Matthew Arquetta exchanged 10pts for{" "}
                        <a href="#">Lego Set</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Jonathan Pagaduan exchanged 100pts for{" "}
                        <a href="#">Transformers Lego Set</a>
                      </p>{" "}
                      <span>Given on 7/14/2021</span>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Peter Seejay exchanged 100pts for{" "}
                        <a href="#">Harry Potter Collection</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Peter Seejay exchanged 100pts for{" "}
                        <a href="#">Harry Potter Collection</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Peter Seejay exchanged 100pts for{" "}
                        <a href="#">Harry Potter Collection</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Peter Seejay exchanged 100pts for{" "}
                        <a href="#">Harry Potter Collection</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                    <div className="transactions__group">
                      <p>
                        Peter Seejay exchanged 100pts for{" "}
                        <a href="#">Harry Potter Collection</a>
                      </p>{" "}
                      <button class="btn--micro">Give Prize</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;