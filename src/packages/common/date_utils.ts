import { format, formatDistance, getMonth, set } from "date-fns";

export const formatDate = (date?: Date): string => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

export const formatDateFollowYM = (date?: Date): string => {
  if (!date) return "";
  return format(date, "yyyy-MM");
};

//  ---------------------------------- LUẬT QUY ĐỊNH CỦA BÁO CÁO ----------------------------------------------
export const validateTimeStartDayOfMonth =
  (Number.isNaN(
    +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]
  )
    ? 0
    : +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]) <
  10
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { date: 1 }); // lấy ngày 1 tháng hiện tại

//  ---------------------------------- LUẬT QUY ĐỊNH CỦA NGHIỆP VỤ ----------------------------------------------
// 1. Ngày thực hiện tìm kiếm sau ngày 15 của tháng hiện tại --> thời gian tìm kiếm bắt đầu từ 01 tháng hiện tại
// 2. Ngày thực hiện tìm kiếm trước ngày 15 của tháng hiện tại --> thời gian tìm kiếm bắt đầu từ 01 tháng trước
export const validateMajorTimeStartDayOfMonth =
  (Number.isNaN(
    +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]
  )
    ? 0
    : +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]) <
  15
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { month: +getMonth(Date.now()), date: 1 }); // lấy ngày 1 tháng hiện tại
