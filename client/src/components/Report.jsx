import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Report = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const [offsetData, setOffsetData] = useState(1);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://lotus-xqir.onrender.com/report/${offsetData}`
        );
        const { data } = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (offsetData <= 25) {
      fetchData();
    } else {
      setOffsetData(1);
      fetchData();
    }
  }, [offsetData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffsetData((prevValue) => prevValue + 1);
    }, 10000);

    return () => {
      clearInterval(timer); // Clear the timer on unmount
    };
  }, []);

  useEffect(() => {
    const batchTime = reportData.map(
      (item) => item.batch_time && item.batch_time
    );

    const labels = [];
    for (var i = 0; i < batchTime.length; i++) {
      const dateTimeString = batchTime[i];
      const dateTime = new Date(dateTimeString);

      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      labels.push(`${hours}:${minutes}`);
    }

    const predValue = reportData.map((item) => item.pred_val);
    const pciValue = reportData.map((item) => item.pci_kgthm);
    const o2 = reportData.map((item) => item.o2_enrichment);
    const raft = reportData.map((item) => item.raft);

    const topLeftData = {
      labels,
      datasets: [
        {
          label: "Actual Silicon",
          data: predValue,
          backgroundColor: "#f78220",
          borderColor: "#f78220",
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const topRightData = {
      labels,
      datasets: [
        {
          label: "Predicted Silicon",
          data: pciValue,
          backgroundColor: "#f78220",
          borderColor: "#f78220",
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const bottomLeftData = {
      labels,
      datasets: [
        {
          label: "O2 Enrichment",
          data: o2,
          backgroundColor: "#f78220",
          borderColor: "#f78220",
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const bottomRightData = {
      labels,
      datasets: [
        {
          label: "Raft",
          data: raft,
          backgroundColor: "#f78220",
          borderColor: "#f78220",
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      backgroundColor: "rgba(40, 40, 40, 1)",

      animation: "linear",
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 17,
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: "rgba(40, 40, 40, 1)", // Customize the color of x-axis grid lines
            beginAtZero: true,
          },
        },
        y: {
          grid: {
            display: true,
            color: "rgba(40, 40, 40, 1)", // Customize the color of y-axis grid lines
            beginAtZero: true,
          },
        },
      },
    };

    const config1 = {
      type: "line",
      data: topLeftData,
      options: options,
    };

    const myChart = new Chart(chartRef1.current, config1);

    const config2 = {
      type: "line",
      data: topRightData,
      options: options,
    };

    const myChart2 = new Chart(chartRef2.current, config2);

    const config3 = {
      type: "line",
      data: bottomLeftData,
      options: options,
    };

    const myChart3 = new Chart(chartRef3.current, config3);

    const config4 = {
      type: "line",
      data: bottomRightData,
      options: options,
    };

    const myChart4 = new Chart(chartRef4.current, config4);

    const hover1 = (move) => {
      const points = myChart.getElementsAtEventForMode(
        move,
        "nearest",
        {
          intersect: false,
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

        myChart3.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.update();

        myChart4.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.update();
      }
    };

    const hover2 = (move) => {
      const points = myChart2.getElementsAtEventForMode(
        move,
        "nearest",
        {
          intersect: false,
        },
        true
      );

      if (points[0]) {
        const dataset = points[0].datasetIndex;
        const datapoint = points[0].index;

        myChart.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.update();

        myChart3.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.update();

        myChart4.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.update();
      }
    };

    const hover3 = (move) => {
      const points = myChart2.getElementsAtEventForMode(
        move,
        "nearest",
        {
          intersect: false,
        },
        true
      );

      if (points[0]) {
        const dataset = points[0].datasetIndex;
        const datapoint = points[0].index;

        myChart.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.update();

        myChart2.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.update();

        myChart4.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart4.update();
      }
    };

    const hover4 = (move) => {
      const points = myChart2.getElementsAtEventForMode(
        move,
        "nearest",
        {
          intersect: false,
        },
        true
      );

      if (points[0]) {
        const dataset = points[0].datasetIndex;
        const datapoint = points[0].index;

        myChart.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart.update();
        myChart2.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart2.update();
        myChart3.tooltip.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.setActiveElements([
          { datasetIndex: dataset, index: datapoint },
        ]);
        myChart3.update();
      }
    };
    myChart.canvas.onmousemove = hover1;
    myChart2.canvas.onmousemove = hover2;
    myChart3.canvas.onmousemove = hover3;
    myChart4.canvas.onmousemove = hover4;

    return () => {
      myChart.destroy();
      myChart2.destroy();
      myChart3.destroy();
      myChart4.destroy();
    };
  }, [reportData]);

  return (
    <div className="page report">
      <Navbar />
      <Sidebar />
      <div
        className="px-5"
        style={{ marginLeft: "220px", paddingTop: "130px" }}
      >
        <h2 className="text-white fw-bold">Hot Metal Silicon</h2>
        <br />
        <div className="row">
          <div className="col">
            <div
              className="p-2"
              style={{ backgroundColor: "rgba(40, 40, 40, 0.3)" }}
            >
              <canvas ref={chartRef1}></canvas>
              <small>Silicon %</small>
            </div>
          </div>
          <div className="col">
            <div
              className="p-2"
              style={{ backgroundColor: "rgba(40, 40, 40, 0.3)" }}
            >
              <canvas ref={chartRef2}></canvas>
              <small>Silicon %</small>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <div
              className="p-2"
              style={{ backgroundColor: "rgba(40, 40, 40, 0.3)" }}
            >
              <canvas ref={chartRef3}></canvas>
              <small>Silicon %</small>
            </div>
          </div>
          <div className="col">
            <div
              className="p-2"
              style={{ backgroundColor: "rgba(40, 40, 40, 0.3)" }}
            >
              <canvas ref={chartRef4}></canvas>
              <small>Silicon %</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
