import React, { useState } from "react";
import "./App.css";
import Header from "./component/Head";
import Content from "./component/Content";
import { useTranslation } from "react-i18next";

function App() {
  /* 宣告今天日期，算出這週日和下週日日期 */
  const [today, setToday] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(), //號
    day: new Date().getDay(), //星期、幾天
  });
  const calThisSunday = today.date - today.day;
  const thisSunday = {
    year: new Date(today.year, today.month, calThisSunday).getFullYear(),
    month: new Date(today.year, today.month, calThisSunday).getMonth(),
    date: new Date(today.year, today.month, calThisSunday).getDate(),
  };
  const calNextSunday = 7 - today.day + today.date;
  const nextSunday = {
    year: new Date(today.year, today.month, calNextSunday).getFullYear(),
    month: new Date(today.year, today.month, calNextSunday).getMonth() + 1,
    date: new Date(today.year, today.month, calNextSunday).getDate(),
  };
  const dayData = {
    today,
    setToday,
    thisSunday,
    nextSunday,
  };

  /* 實現i18n */
  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="App">
      {/*       <div className="lang">
        <button onClick={() => handleClick("en")}>English</button>
        <button onClick={() => handleClick("chi")}>Chinese</button>
        <h1>{t("Thanks.1")}</h1>
      </div> */}
      <Header dayData={dayData} />
      <Content dayData={dayData} />
    </div>
  );
}

export default App;
