import React from "react";

const HourlySchedule = ({ AvaDay, Booked, eachDayIs }) => {
  /* 判斷是不是被預定；
  分解JSON資料成字串的年月日來做比對；
  被預訂的資料純比對用，不轉字串 */
  let startBOOKED = false;
  let endBOOKED = false;
  const avaDateArray_id = AvaDay.map((item) => item.id);
  const avaDateArray_Start = AvaDay.map((item) => new Date(item.start));
  const strAvaDate_Start = {
    year: avaDateArray_Start.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        year: "numeric",
      })
    ),
    month: avaDateArray_Start.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        month: "2-digit",
      })
    ),
    date: avaDateArray_Start.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        day: "2-digit",
      })
    ),
    time: avaDateArray_Start.map((DATE) =>
      DATE.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  };
  const avaDateArray_End = AvaDay.map((item) => new Date(item.end));
  const strAvaDate_End = {
    year: avaDateArray_End.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        year: "numeric",
      })
    ),
    month: avaDateArray_End.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        month: "2-digit",
      })
    ),
    date: avaDateArray_End.map((DATE) =>
      DATE.toLocaleDateString("en-GB", {
        day: "2-digit",
      })
    ),
    time: avaDateArray_End.map((DATE) =>
      DATE.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  };
  const bookedArray_Start = Booked.map((item) => new Date(item.start));

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
      id: avaDateArray_id[i],
      start: strAvaDate_Start.time[i],
      end: strAvaDate_End.time[i],
    });
  };
  for (let i = 0; i < avaDateArray_Start.length; i++) {
    if (
      eachDayIs.year.toString() === strAvaDate_Start.year[i] &&
      eachDayIs.month.toString() === strAvaDate_Start.month[i] &&
      eachDayIs.date.toString() === strAvaDate_Start.date[i]
    ) {
      pushAvatime(i);
      for (let j = 0; j < bookedArray_Start.length; j++) {
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

  /* 將陣列排序，依數字小到大 */
  daySchedule.sort(function (a, b) {
    return a.start.localeCompare(b.start);
  });

  return (
    <div className="hourlyDiv">
      {daySchedule.map((data) => (
        <div>
          <h4 style={{ color: startBOOKED ? "gray" : "green" }} key={data.id}>
            {data.start}
          </h4>
          <h4 style={{ color: endBOOKED ? "gray" : "green" }}>{data.end}</h4>
        </div>
      ))}
    </div>
  );
};

export default HourlySchedule;
