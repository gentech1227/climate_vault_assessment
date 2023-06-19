import { Col, Row, Statistic } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  TRANSACTION_DATA_AMOUNT,
  TRANSACTION_DATA_TIMES,
} from "../../constants";

const ReportStatistics = () => {
  const { count, total, data } = useSelector(({ report }) => report);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total Records" value={count} />
      </Col>
      <Col span={6}>
        <Statistic
          title={`Total ${
            data === TRANSACTION_DATA_AMOUNT ? "Amount" : "Times"
          }`}
          value={total}
          precision={2}
          prefix={data === TRANSACTION_DATA_AMOUNT && "USD"}
          suffix={data === TRANSACTION_DATA_TIMES && "ms"}
        />
      </Col>
    </Row>
  );
};

export default ReportStatistics;
