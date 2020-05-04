import React from "react";

const ButtonAndDate = ({ dayData }) => {
  /* 秀出日期 */
  const showDate =
    dayData.thisSunday.year +
    "/" +
    (dayData.thisSunday.month + 1) +
    "/" +
    dayData.thisSunday.date +
    "-" +
    dayData.nextSunday.date;

  /* 下個週就是今天日期+7 */
  const nextWeek = {
    year: dayData.today.year,
    month: dayData.today.month,
    date: dayData.today.date + 7,
    day: dayData.today.day,
  };
  /* 上個週就是今天日期-7 */
  const lastWeek = {
    year: dayData.today.year,
    month: dayData.today.month,
    date: dayData.today.date - 7,
    day: dayData.today.day,
  };

  return (
    <div className="dateDiv">
      <div className="btnDiv">
        <button
          disabled={
            new Date() >
            new Date(
              dayData.thisSunday.year,
              dayData.thisSunday.month,
              dayData.thisSunday.date
            )
          }
          className="btn"
          onClick={() => dayData.setToday(lastWeek)}
        >
          &#8249;
        </button>

        <button className="btn" onClick={() => dayData.setToday(nextWeek)}>
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
