import { Divider } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import {
  TRANSACTION_DATA_TIMES,
  TRANSACTION_TYPE_ESTIMATE,
} from "../../constants";
import ReportWizard from "./ReportWizard";

const Report = () => {
  const [from, setFrom] = useState(dayjs().add(-1, "year"));
  const [to, setTo] = useState(dayjs());
  const [type, setType] = useState(TRANSACTION_TYPE_ESTIMATE);
  const [data, setData] = useState(TRANSACTION_DATA_TIMES);

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
      />
      <Divider className="w-full" />
    </div>
  );
};

export default Report;
