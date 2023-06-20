import React, { useMemo } from "react";

import { Col, Row, Statistic } from "antd";

import { useSelector } from "react-redux";

import { TRANSACTION_DATA } from "../../constants";

export const ReportStatistics = () => {
  const { count, total, data } = useSelector(({ report }) => report);

  const amountMode = useMemo(() => data === TRANSACTION_DATA.AMOUNT, [data]);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total Records" value={count} />
      </Col>
      <Col span={6}>
        <Statistic
          title={`Total ${amountMode ? "Amount" : "Times"}`}
          value={total}
          precision={2}
          prefix={amountMode && "USD"}
          suffix={!amountMode && "ms"}
        />
      </Col>
    </Row>
  );
};
