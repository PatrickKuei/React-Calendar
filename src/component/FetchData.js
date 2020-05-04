import { useState, useEffect } from "react";

const FetchData = (url) => {
  /* 取後端資料；目前沒有 */
  const [availableTime, setAvailableTime] = useState({});
  const [bookedTime, setBookedTime] = useState({});
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
        setAvailableTime(theJson);
        setIsALoaded(true);
      });
  };
  const fetchBookedData = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((theJson) => {
        setBookedTime(theJson);
        setIsBLoaded(true);
      });
  };

  return {
    availableTime,
    bookedTime,
    isALoaded,
    isBLoaded,
  };
};

export default FetchData;
