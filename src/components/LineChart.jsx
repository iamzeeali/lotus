// React 18 code

import React, { useEffect, useRef } from "react";
import "./LineChart.css";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const data1 = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config1 = {
      type: "line",
      data: data1,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(chartRef1.current, config1);

    const data2 = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [99, 66, 33, 99, 66, 33, 22],
          backgroundColor: [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config2 = {
      type: "line",
      data: data2,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart2 = new Chart(chartRef2.current, config2);

    const hover1 = (move) => {
      const points = myChart.getElementsAtEventForMode(
        move,
        "nearest",
        {
          intersect: true,
        },
        true
      );

      if (points[0]) {
        const dataset = points[0].datasetIndex;
        const datapoint = points[0].index;
        myChart2.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.update();
      }
    };

    myChart.canvas.onmousemove = hover1;

    return () => {
      myChart.destroy();
      myChart2.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="chartCard">
            <div className="chartBox">
              <canvas ref={chartRef1}></canvas>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="chartCard">
            <div className="chartBox">
              <canvas ref={chartRef2}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
