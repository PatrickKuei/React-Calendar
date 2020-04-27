import React from "react";

const ButtonAndDate = ({ DATE, dayData }) => {
  const leftDate = dayData.leftDate;
  const setLeftDate = dayData.setLeftDate;
  const rightDate = dayData.rightDate;
  const setRightDate = dayData.setRightDate;
  const daysInMonth = dayData.daysInMonth;
  const thisSundayDate = dayData.thisSundayDate;
  const setThisSundayDate = dayData.setThisSundayDate;
  const nextSundayDate = dayData.nextSundayDate;
  const setNextSundayDate = dayData.setNextSundayDate;

  /* 宣告左邊和右邊日期進入下個月的function*/
  const nextLeftMonth = () => {
    setLeftDate({
      year: leftDate.year,
      month: leftDate.month + 1,
      date: leftDate.date,
      day: leftDate.day,
    });
  };
  const nextRightMonth = () => {
    setRightDate({
      year: rightDate.year,
      month: rightDate.month + 1,
      date: rightDate.date,
      day: rightDate.day,
    });
  };

  /* 按右邊按鈕時會同時將兩邊日期前進到下一週，且會自動進入下個月 */
  const nextWeek = () => {
    return (
      nextSundayDate + 7 <= daysInMonth(rightDate.year, rightDate.month)
        ? setNextSundayDate(nextSundayDate + 7)
        : (setNextSundayDate(
            nextSundayDate + 7 - daysInMonth(rightDate.year, rightDate.month)
          ),
          nextRightMonth()),
      thisSundayDate + 7 <= daysInMonth(leftDate.year, leftDate.month)
        ? setThisSundayDate(thisSundayDate + 7)
        : (setThisSundayDate(
            thisSundayDate + 7 - daysInMonth(leftDate.year, leftDate.month)
          ),
          nextLeftMonth())
    );
  };

  /* 宣告左邊和右邊日期進入上個月的function */
  const lastOtherMonth = () => {
    setRightDate({
      year: rightDate.year,
      month: rightDate.month - 1,
      date: rightDate.date,
      day: rightDate.day,
    });
  };
  const lastMonth = () => {
    setLeftDate({
      year: leftDate.year,
      month: leftDate.month - 1,
      date: leftDate.date,
      day: leftDate.day,
    });
  };

  /* 按左邊按鈕時會同時將兩邊日期前進到上一週，且會自動進入上個月 */
  const lastPeriod = () => {
    return (
      nextSundayDate - 7 >= 1
        ? setNextSundayDate(nextSundayDate - 7)
        : (setNextSundayDate(
            nextSundayDate -
              7 +
              daysInMonth(rightDate.year, rightDate.month - 1)
          ),
          lastOtherMonth()),
      thisSundayDate - 7 >= 1
        ? setThisSundayDate(thisSundayDate - 7)
        : (setThisSundayDate(
            thisSundayDate - 7 + daysInMonth(leftDate.year, leftDate.month - 1)
          ),
          lastMonth())
    );
  };

  /* 判斷是否是過去的週 */
  const inThePast =
    thisSundayDate > dayData.today.date || leftDate.month > dayData.today.month
      ? false
      : true;

  /* 秀出日期 */
  const showDate =
    leftDate.month === rightDate.month
      ? leftDate.year +
        "/" +
        leftDate.month +
        "/" +
        thisSundayDate +
        "-" +
        nextSundayDate
      : leftDate.year +
        "/" +
        leftDate.month +
        "/" +
        thisSundayDate +
        "-" +
        rightDate.month +
        "/" +
        nextSundayDate;
  return (
    <div className="dateDiv">
      <div className="btnDiv">
        <button disabled={inThePast} className="btn" onClick={lastPeriod}>
          &#8249;
        </button>

        <button className="btn" onClick={nextWeek}>
          &#8250;
        </button>
      </div>
      <div className="flex">
        <h2>{showDate}</h2>
      </div>
    </div>
  );
};

export default ButtonAndDate;
