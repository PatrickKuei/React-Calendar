import React, { useState } from "react";
import "./App.css";
import Header from "./component/Head";
import Content from "./component/Content";
import { translate, Trans, useTranslation } from "react-i18next";

function App() {
  /* 宣告兩個今天的年月日，一個用在左邊週日日期；一個用在右邊週日日期 
  只有幾月幾號用date*/
  const DATE = new Date();
  const today = {
    year: DATE.getFullYear(),
    month: DATE.getMonth() + 1,
    date: DATE.getDate(), //號
    day: DATE.getDay(), //星期、幾天
  };
  const [leftDate, setLeftDate] = useState(today);
  /* 宣告一個月有幾天，左邊的週日是幾號；右邊的週日是幾號 */
  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const [thisSundayDate, setThisSundayDate] = useState(
    leftDate.date - leftDate.day > 0
      ? leftDate.date - leftDate.day
      : leftDate.date -
          leftDate.day +
          daysInMonth(leftDate.year, leftDate.month - 1)
  );
  /* 判斷右邊日期是否同一個月 */
  const isThisMonth =
    thisSundayDate + 7 <= daysInMonth(leftDate.year, leftDate.month)
      ? true
      : false;
  const [nextSundayDate, setNextSundayDate] = useState(
    isThisMonth
      ? thisSundayDate + 7
      : thisSundayDate + 7 - daysInMonth(leftDate.year, leftDate.month)
  );
  const [rightDate, setRightDate] = useState({
    year: leftDate.year,
    month: isThisMonth ? leftDate.month : leftDate.month + 1,
    date: leftDate.date, //號
    day: leftDate.day, //星期、幾天
  });
  /* 把要傳的props打包 */
  const dayData = {
    today,
    leftDate,
    setLeftDate,
    rightDate,
    setRightDate,
    daysInMonth,
    thisSundayDate,
    setThisSundayDate,
    nextSundayDate,
    setNextSundayDate,
  };

  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="App">
      <div className="lang">
        <button onClick={() => handleClick("en")}>English</button>
        <button onClick={() => handleClick("chi")}>Chinese</button>
      </div>
      <Header DATE={DATE} dayData={dayData} t={t} />
      <Content DATE={DATE} dayData={dayData} />
    </div>
  );
}

export default App;
