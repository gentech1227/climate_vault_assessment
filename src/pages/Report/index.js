import { Divider } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TRANSACTION_DATA_TIMES,
  TRANSACTION_TYPE_ESTIMATE,
} from "../../constants";
import { getReportData } from "../../store/report";
import ReportChart from "./ReportChart";
import ReportStatistics from "./ReportStatistics";
import ReportWizard from "./ReportWizard";

const Report = () => {
  const dispatch = useDispatch();

  const [from, setFrom] = useState(dayjs().add(-1, "year"));
  const [to, setTo] = useState(dayjs());
  const [type, setType] = useState(TRANSACTION_TYPE_ESTIMATE);
  const [data, setData] = useState(TRANSACTION_DATA_TIMES);

  const handleSearch = () => {
    dispatch(getReportData({ from, to, type, data }));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <ReportWizard
        from={from}
        to={to}
        type={type}
        data={data}
        onChange={(from, to, type, data) => {
          setFrom(from);
          setTo(to);
          setType(type);
          setData(data);
        }}
        onSearch={handleSearch}
      />
      <Divider />
      <ReportStatistics />
      <Divider />
      <ReportChart />
    </div>
  );
};

export default Report;
