import React from "react";
import ButtonAndDate from "./ButtonAndDate";
import { Translation } from "react-i18next";

const Header = ({ DATE, dayData }) => {
  return (
    <div className="headerDiv">
      <div className="titleDiv">
        <Translation>{(t, { i18n }) => <h1>{t("Title.1")}</h1>}</Translation>
      </div>
      <div className="inforDiv">
        <ButtonAndDate DATE={DATE} dayData={dayData} />
        <div className="gmtDiv">
          <Translation>{(t, { i18n }) => <p>{t("GMT Time.1")}</p>}</Translation>
        </div>
      </div>
    </div>
  );
};

export default Header;
