import React, { useEffect, useState } from "react";

import { Divider } from "antd";
import { ReportChart } from "./ReportChart";
import { ReportStatistics } from "./ReportStatistics";
import { ReportWizard } from "./ReportWizard";

import { getReportData } from "../../store/report";
import { useDispatch } from "react-redux";

import { TRANSACTION_DATA, TRANSACTION_TYPE } from "../../constants";

import dayjs from "dayjs";

export const Report = () => {
  const dispatch = useDispatch();

  const [from, setFrom] = useState(dayjs().add(-1, "year"));
  const [to, setTo] = useState(dayjs());
  const [type, setType] = useState(TRANSACTION_TYPE.ESTIMATE);
  const [data, setData] = useState(TRANSACTION_DATA.TIMES);

  const handleChange = (from, to, type, data) => {
    setFrom(from);
    setTo(to);
    setType(type);
    setData(data);
  };

  const handleSearch = () => {
    dispatch(getReportData({ from, to, type, data }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ReportWizard
        from={from}
        to={to}
        type={type}
        data={data}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <Divider />
      <ReportStatistics />
      <Divider />
      <ReportChart />
    </>
  );
};
