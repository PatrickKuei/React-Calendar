import React from "react";
import EachDay from "./EachDay";
import AvaDayJson from "../available.json";
import BookedJson from "../booked.json";
import FetchData from "./FetchData";

/* 顯示下半部日期、時間、行程的部分 */
const Content = ({ dayData }) => {
  const { ...fetchData } = FetchData("url");
  const chineseDay = ["日", "一", "二", "三", "四", "五", "六"];
  const sevenDays = [];

  const make7days = (AvaDay, Booked) => {
    for (let i = 0; i < 7; i++) {
      const date = new Date(
        dayData.thisSunday.year,
        dayData.thisSunday.month,
        dayData.thisSunday.date + i
      );
      sevenDays.push(
        <EachDay
          date={date}
          chineseDay={chineseDay[i]}
          AvaDay={AvaDay}
          Booked={Booked}
          dayData={dayData}
          key={i}
        />
      );
    }
  };

  /* 若沒取到後端資料 */
  if (!fetchData.isALoaded || !fetchData.isBLoaded) {
    const AvaDay = AvaDayJson;
    const Booked = BookedJson;
    make7days(AvaDay, Booked);
    return <div className="contentDiv">{sevenDays}</div>;
  } else {
    const AvaDay = fetchData.availableTime;
    const Booked = fetchData.bookedTime;
    make7days(AvaDay, Booked);
    return <div className="contentDiv">{sevenDays}</div>;
  }
};

export default Content;
