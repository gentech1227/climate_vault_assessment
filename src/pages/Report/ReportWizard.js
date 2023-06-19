import { DatePicker, Select } from "antd";
import React from "react";
import {
  DATE_FORMAT,
  TRANSACTION_DATA_AMOUNT,
  TRANSACTION_DATA_TIMES,
  TRANSACTION_TYPE_ESTIMATE,
  TRANSACTION_TYPE_ORDER,
  TRANSACTION_TYPE_QUOTE,
} from "../../constants";

const { Option } = Select;

const ReportWizard = ({ from, to, type, data, onChange }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-wrap mt-4">
        <DatePicker.RangePicker
          value={[from, to]}
          onChange={(dt) => {
            onChange(dt[0], dt[1], type, data);
          }}
          format={DATE_FORMAT}
        />
        <Select
          className="mx-4 w-36"
          value={type}
          onSelect={(val) => onChange(from, to, val, data)}
        >
          <Option key={TRANSACTION_TYPE_ESTIMATE}>Estimate</Option>
          <Option key={TRANSACTION_TYPE_QUOTE}>Quote</Option>
          <Option key={TRANSACTION_TYPE_ORDER}>Order</Option>
        </Select>
        <Select
          className="w-36"
          value={data}
          onChange={(val) => onChange(from, to, type, val)}
        >
          <Option key={TRANSACTION_DATA_TIMES}>Times</Option>
          <Option key={TRANSACTION_DATA_AMOUNT}>Amount</Option>
        </Select>
      </div>
    </div>
  );
};

export default ReportWizard;
