import React from "react";
import HourlySchedule from "./hourlySchedule";

const EachDay = ({ date, chineseDay, AvaDay, Booked }) => {
  /* 對日期補零 */
  const thisDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  /* 判斷是否是過去的日子 */
  const past = date < new Date().setHours(0, 0, 0, 0) ? true : false;
  return (
    <div className="eachDayDiv">
      <div className={past ? "toGray" : "acvatedDiv"}></div>
      <div className={past ? "textToGray" : "weekNumberDiv"}>
        <h2>{chineseDay}</h2>
        <h2>{thisDate}</h2>

        <HourlySchedule
          AvaDay={AvaDay}
          Booked={Booked}
          past={past}
          date={date}
        />
      </div>
    </div>
  );
};

export default EachDay;
