import React from "react";
import HourlySchedule from "./hourlySchedule";

const EachDay = ({
  date,
  chineseDay,
  AvaDay,
  Booked,
  dayData,
  IsNextMonth,
}) => {
  /* 打包每一天的年月日
  只有幾月幾號用date */
  let eachDayIs = {
    year: dayData.leftDate.year,
    month: dayData.leftDate.month,
    date: date,
    day: chineseDay,
  };

  /* 月份要跟著日期進位並且把<10的月份和日期補零 */
  eachDayIs.month = IsNextMonth ? eachDayIs.month + 1 : eachDayIs.month;
  eachDayIs.month =
    eachDayIs.month < 10 ? "0" + eachDayIs.month : eachDayIs.month;
  eachDayIs.date = eachDayIs.date < 10 ? "0" + eachDayIs.date : eachDayIs.date;

  /* 判斷是否是過去的日子 */
  let past = false;
  past =
    eachDayIs.month <= dayData.today.month && date < dayData.today.date
      ? true
      : false;
  return (
    <div className="eachDayDiv">
      <div className={past ? "toGray" : "acvatedDiv"}></div>
      <div className={past ? "textToGray" : "weekNumberDiv"}>
        <h2>{chineseDay}</h2>
        <h2>{eachDayIs.date}</h2>
      </div>
      <HourlySchedule AvaDay={AvaDay} Booked={Booked} eachDayIs={eachDayIs} />
    </div>
  );
};

export default EachDay;
