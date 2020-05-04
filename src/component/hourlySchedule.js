import React from "react";
import handleData from "./handleData";

const HourlySchedule = ({ AvaDay, Booked, past, date }) => {
  const { ...data } = handleData(AvaDay, Booked);

  let startBOOKED = false; //被訂走的日期要改色
  let endBOOKED = false;
  /* 宣告一個空陣列來放一天全部行程；
  一個功能來把時間放進陣列中；
  用迴圈比對日期和DB資料的日期：
    「若DB中有和該日相同的"年""月""日"，則執行放入陣列功能」；
    用迴圈比對兩個JSON的日期：
    「若可預定的結束日期不等於被預訂的開始日期，則將文字顯示成綠色；反之灰色。
    若可預訂的開始日期等於被預訂的結束日期，則顯示灰色；反之綠色」 */
  const daySchedule = [];
  const pushAvatime = (i) => {
    daySchedule.push({
      id: data.avaDateArray_id[i],
      start: data.stringAvaDate_Start.time[i],
      end: data.stringAvaDate_End.time[i],
    });
  };

  if (!past) {
    for (let i in data.avaDateArray_Start) {
      if (data.avaDateArray_Start[i].setHours(0, 0, 0, 0) === date.getTime()) {
        pushAvatime(i);
        for (let j in data.bookedArray_Start) {
          if (AvaDay[i].end !== Booked[j].start) {
            if (AvaDay[i].start === Booked[j].end) {
              endBOOKED = true;
            } else {
              startBOOKED = true;
            }
          }
        }
      }
    }
  }

  /* 將陣列排序，依數字小到大 */
  daySchedule.sort(function (a, b) {
    return a.start.localeCompare(b.start);
  });

  return (
    <div className="hourlyDiv">
      {daySchedule.map((data) => (
        <div key={data.id}>
          <h4 style={{ color: startBOOKED ? "gray" : "green" }}>
            {data.start}
          </h4>
          <h4 style={{ color: endBOOKED ? "gray" : "green" }}>{data.end}</h4>
        </div>
      ))}
    </div>
  );
};

export default HourlySchedule;
