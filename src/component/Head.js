import React from "react";
import ButtonAndDate from "./ButtonAndDate";
/* import { Translation } from "react-i18next"; */

const Header = ({ dayData }) => {
  return (
    <div className="headerDiv">
      <div className="titleDiv">
        {/* <Translation>{(t, { i18n }) => <h1>{t("Title.1")}</h1>}</Translation> */}
        <h1>Available Times</h1>
      </div>
      <div className="inforDiv">
        <ButtonAndDate dayData={dayData} />
        <div className="gmtDiv">
          {/* <Translation>{(t, { i18n }) => <p>{t("GMT Time.1")}</p>}</Translation> */}
          <p>
            * All the timings listed are in your timezone: HongKong (GMT+08:00)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
