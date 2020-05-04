/* 將db資料取出，分解成可預定日期的開始和結束；不可預定日期的開始；
將時間設定成2位數，回傳 */

const handleData = (AvaDay, Booked) => {
  const avaDateArray_id = AvaDay.map((item) => item.id);
  const avaDateArray_Start = AvaDay.map((item) => new Date(item.start));
  const avaDateArray_End = AvaDay.map((item) => new Date(item.end));
  const bookedArray_Start = Booked.map((item) => new Date(item.start));

  const stringAvaDate_Start = {
    time: avaDateArray_Start.map((DATE) =>
      DATE.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  };
  const stringAvaDate_End = {
    time: avaDateArray_End.map((DATE) =>
      DATE.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  };
  const { ...data } = {
    avaDateArray_id,
    avaDateArray_Start,
    avaDateArray_End,
    bookedArray_Start,
    stringAvaDate_Start,
    stringAvaDate_End,
  };
  return data;
};

export default handleData;
