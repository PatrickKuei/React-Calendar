import React, { useState, useEffect } from "react";
import EachDay from "./EachDay";
import AvaDayJson from "../available.json";
import BookedJson from "../booked.json";

/* 顯示下半部日期、時間、行程的部分 */

const Content = ({ dayData }) => {
  /* 宣告一個陣列來顯示中文星期；
    一個一週陣列來實現 loop 7個day(； 
    每天的日期(號)，初始值為當週週日的日期(號)；
    一個計數用的日期，來判定是否超過31號；
    把該月天數抓出來；
    是否超過31號和日期是否等於零 */

  const chineseDay = ["日", "一", "二", "三", "四", "五", "六"];
  const sevenDays = [];
  let thisSundayDate = dayData.thisSundayDate;
  let date = thisSundayDate;
  let countDays = thisSundayDate;
  let daysInMonth = dayData.daysInMonth(
    dayData.leftDate.year,
    dayData.leftDate.month
  ); //左邊月份的日子
  let IsNextMonth = false;

  /* 若沒取到後端資料 */
  const AvaDay = AvaDayJson;
  const Booked = BookedJson;

  /* 一週7天都要判斷日期是否超過該月；日期是否為零；
  從該週第一天(週日)開始+0~7，並指定給每一天的日期(號)；
  若超過，將日期(號)減掉該月總日子 e.g. 32-31=1號；
  把每一天放進一週陣列中；
  */
  for (let i = 0; i < 7; i++) {
    IsNextMonth = countDays > daysInMonth ? true : false;
    if (!IsNextMonth && countDays !== daysInMonth) {
      date = thisSundayDate + i;
      countDays = thisSundayDate + i;
    } else {
      date = thisSundayDate + i - daysInMonth;
      countDays = thisSundayDate + i;
      IsNextMonth = true;
    }
    if (date === 0) {
      date = daysInMonth;
      IsNextMonth = false;
    }
    sevenDays.push(
      <EachDay
        date={date}
        chineseDay={chineseDay[i]}
        AvaDay={AvaDay}
        Booked={Booked}
        dayData={dayData}
        IsNextMonth={IsNextMonth}
        key={i}
      />
    );
  }
  /* 取後端資料；目前沒有 */
  const [available, setAvailable] = useState({});
  const [booked, setBooked] = useState({});
  const url = "";
  const [isALoaded, setIsALoaded] = useState(false);
  const [isBLoaded, setIsBLoaded] = useState(false);

  useEffect(() => {
    fetchAvailableData();
    fetchBookedData();
  }, []);

  const fetchAvailableData = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((theJson) => {
        setAvailable(theJson);
        setIsALoaded(true);
      });
  };
  const fetchBookedData = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((theJson) => {
        setBooked(theJson);
        setIsBLoaded(true);
      });
  };

  /* 若沒取到後端資料，先用暫定資料製作內容 */
  if (!isALoaded || !isBLoaded) {
    return <div className="contentDiv">{sevenDays}</div>;
  }
  return (
    <div>
      <p>{available.map((item) => item.login)}</p>
      <p>{booked.map((item) => item.id)}</p>
    </div>
  );
};

export default Content;
