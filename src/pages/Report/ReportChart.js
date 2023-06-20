import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useSelector } from "react-redux";
import { TRANSACTION_DATA_AMOUNT } from "../../constants";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ReportChart = () => {
  const { monthly, data } = useSelector(({ report }) => report);

  const addSymbols = (e) => {
    if (data === TRANSACTION_DATA_AMOUNT) {
      var suffixes = ["", "K", "M", "B"];
      var order = Math.max(
        Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
        0
      );
      if (order > suffixes.length - 1) order = suffixes.length - 1;
      var suffix = suffixes[order];
      return (
        "$" + CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix
      );
    } else {
      return Math.floor(e.value / 1000) + "s";
    }
  };

  const options = {
    colorSet: "colorSet2",
    title: {
      text: "Monthly Transactions",
    },
    axisX: {
      valueFormatString: "MMMM YYYY",
    },
    axisY: {
      labelFormatter: addSymbols,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      verticalAlign: "bottom",
    },
    data: [
      {
        type: "column",
        name:
          data === TRANSACTION_DATA_AMOUNT ? "Sum of Amount" : "Sum of Times",
        showInLegend: true,
        xValueFormatString: "MMMM YYYY",
        yValueFormatString: "$#,##0",
        dataPoints: monthly.map((month) => ({
          x: new Date(month.x),
          y: month.y,
          indexLabel: addSymbols({ value: month.y }),
        })),
      },
      {
        type: "line",
        name:
          data === TRANSACTION_DATA_AMOUNT
            ? "Cumulative Amount"
            : "Cumulative Times",
        showInLegend: true,
        yValueFormatString: "$#,##0",
        dataPoints: monthly.reduce(
          (cur, month) => [
            ...cur,
            {
              x: new Date(month.x),
              y: (cur.length === 0 ? 0 : cur[cur.length - 1].y) + month.y,
            },
          ],
          []
        ),
      },
    ],
  };
  return (
    <div className="lg:w-2/3 md:w-full min-w-96">
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ReportChart;
