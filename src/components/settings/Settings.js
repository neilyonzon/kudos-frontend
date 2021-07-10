import React from "react";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiOutlineLock } from "@react-icons/all-files/ai/AiOutlineLock";

const Settings = (props) => {
  return (
    <>
      <h4 className="panel__title">Settings</h4>
      <div className="tabs">
        <div className="tabs__headers">
          <div className="tabs__header active" id="tabhead-1">
            General
          </div>
          <div className="tabs__header" id="tabhead-2">
            Security
          </div>
          <div className="tabs__header" id="tabhead-3">
            Treasure Box
          </div>
        </div>
        <div className="tabs__content-container">
          <div className="tabs__content active" id="tabcontent-1">
            <form className="settings-form">
              <div className="settings-form__group">
                <label className="settings-form__label" htmlFor="teacher-name">
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
                  class="settings-form__helper"
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
                  class="settings-form__helper"
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
            <h4>Tab 2</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="tabs__content" id="tabcontent-3">
            <h4>Tab 3</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="tabs__actions">
          <button className="tabs__action-save btn btn--settings">
            Save Update
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
