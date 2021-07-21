import React, { useState } from "react";
import { gql, useQuery, useEffect, useLazyQuery} from "@apollo/client";
import GeneralForm from "./GeneralForm";
import CategoriesForm from "./CategoriesForm";
import ClassesForm from "./ClassesForm";

const Settings = (props) => {
  const [tabClasses, setTabClasses] = useState([
    { tabClass: "tabs__header active", contentClass: "tabs__content active" },
    { tabClass: "tabs__header", contentClass: "tabs__content" },
    { tabClass: "tabs__header", contentClass: "tabs__content" },
  ]);

  const handleTabChange = (index) => {
    let tabs = JSON.parse(JSON.stringify(tabClasses));
    for (let i = 0; i < tabs.length; i++) {
      tabs[i] = {
        tabClass: "tabs__header",
        contentClass: "tabs__content",
      };
    }
    tabs[index] = {
      tabClass: "tabs__header active",
      contentClass: "tabs__content active",
    };
    setTabClasses(tabs);
  };

  return (
    <>
      <h4 className="panel__title">Settings</h4>
      <div className="tabs">
        <div className="tabs__headers">
          <div
            className={tabClasses[0].tabClass}
            id="tabhead-1"
            onClick={() => handleTabChange(0)}
          >
            General
          </div>
          <div
            className={tabClasses[1].tabClass}
            id="tabhead-2"
            onClick={() => handleTabChange(1)}
          >
            Classes
          </div>
          <div
            className={tabClasses[2].tabClass}
            id="tabhead-3"
            onClick={() => handleTabChange(2)}
          >
            Categories
          </div>
        </div>
        <div className="tabs__content-container">
          <div className={tabClasses[0].contentClass} id="tabcontent-1">
            <GeneralForm data={props.data.teacher}/>
          </div>
          <div className={tabClasses[1].contentClass} id="tabcontent-2">
            <ClassesForm />
            <div className="tabs__actions">
              <button className="tabs__action-save btn btn--settings">
                Save Update
              </button>
            </div>
          </div>
          <div className={tabClasses[2].contentClass} id="tabcontent-3">
            <CategoriesForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
