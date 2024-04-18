import { format, getDate, set } from "date-fns";

export const useGetTime = () => {
  const now = new Date();
  const endDate = new Date(now.getTime());
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  const dateCustomize = (dateMinus: any) => {
    const dateTime = set(Date.now(), {
      date: getDate(Date.now()) - dateMinus,
    });
    return dateTime;
  };

  const getTimeHHMMSS = () => {
    // Get the current time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the time to ensure two digits
    const formatHours = (hours < 10 ? "0" : "") + hours;
    const formatMinutes = (minutes < 10 ? "0" : "") + minutes;
    const formatSeconds = (seconds < 10 ? "0" : "") + seconds;

    // Create a string representing the current time in HH:mm:ss format
    const Time =
      format(now, "yyyy-MM-dd") +
      " " +
      formatHours +
      ":" +
      formatMinutes +
      ":" +
      formatSeconds;
    return Time;
  };
  const convertTimeHHMMSStoDateTime = (dateTime: string) => {
    const inputDate = new Date(dateTime);

    // Extract year, month, and day components from the Date object
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(inputDate.getDate()).padStart(2, "0");

    // Form the output date string in the format "YYYY-MM-DD"
    const outputDate = `${year}-${month}-${day}`;
    return outputDate;
  };

  return {
    endDate,
    firstDay,
    now,
    dateCustomize,
    getTimeHHMMSS,
    convertTimeHHMMSStoDateTime,
  };
};
