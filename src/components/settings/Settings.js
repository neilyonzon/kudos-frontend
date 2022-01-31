import React, { useState } from "react";
import GeneralForm from "./GeneralForm";
import CategoriesForm from "./CategoriesForm";
import ClassesForm from "./ClassesForm";
import Transactions from "./Transactions";

const Settings = (props) => {
  const [selectedSetting, setSelectedSetting] = useState("general");

  const [tabClasses, setTabClasses] = useState([
    { tabClass: "tabs__header active", contentClass: "tabs__content active" },
    { tabClass: "tabs__header", contentClass: "tabs__content" },
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

    if (index === 0) {
      setSelectedSetting("general");
    } else if (index === 1) {
      setSelectedSetting("classes");
    } else if (index === 2) {
      setSelectedSetting("categories");
    } else {
      setSelectedSetting("transactions");
    }
  };

  let selectedSettingComponent;
  switch (selectedSetting) {
    case "general":
      selectedSettingComponent = (
        <GeneralForm
          loadUserInfo={props.loadUserInfo}
          teacherInfo={props.data.teacher}
        />
      );
      break;
    case "classes":
      selectedSettingComponent = (
        <ClassesForm
          loadUserInfo={props.loadUserInfo}
          classes={props.data.teacher.classes}
        />
      );
      break;
    case "categories":
      selectedSettingComponent = (
        <CategoriesForm
          loadUserInfo={props.loadUserInfo}
          categories={props.categories}
        />
      );
      break;
    case "transactions":
      selectedSettingComponent = (
        <Transactions
          loadUserInfo={props.loadUserInfo}
          classes={props.classes}
          onSelectClass={props.onSelectClass}
        />
      );
  }


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
          <div
            className={tabClasses[3].tabClass}
            id="tabhead-4"
            onClick={() => handleTabChange(3)}
          >
            Transactions
          </div>
        </div>
        <div className="tabs__content-container">
          <div className={"tabs__content active"}>
            {selectedSettingComponent}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
