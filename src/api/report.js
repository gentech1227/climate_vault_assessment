import dayjs from "dayjs";
import { MONTH_FORMAT } from "../constants";
import db from "./mock.json";

const getReportData = ({ from, to, type, data }) => {
  let monthly = {},
    total = 0;
  for (
    let date = dayjs(`${from.year()}-${from.month() + 1}-1`);
    date <= to;
    date = date.add(1, "month")
  ) {
    monthly = { ...monthly, [date.format(MONTH_FORMAT)]: 0 };
  }
  const filtered = db.filter(
    (item) =>
      item.type == type && dayjs(item.date) >= from && dayjs(item.date) <= to
  );
  filtered.forEach((item) => {
    total += item[data];
    const monthString = dayjs(item.date).format(MONTH_FORMAT);
    monthly = {
      ...monthly,
      [monthString]: monthly[monthString] + item[data],
    };
  });
  return {
    total,
    monthly: Object.keys(monthly).map((month) => ({
      x: month,
      y: monthly[month],
    })),
    data,
    count: filtered.length,
  };
};

export default {
  getReportData,
};
