import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [offsetData, setOffsetData] = useState(1);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/report/${offsetData}`
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
    }, 2000);

    return () => {
      clearInterval(timer); // Clear the timer on unmount
    };
  }, []);

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

  const options = {
    plugins: {
      legend: {
        position: "bottom",
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
          color: "rgba(40, 40, 40, 0.8)", // Customize the color of x-axis grid lines
          beginAtZero: true,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(40, 40, 40, 0.8)", // Customize the color of y-axis grid lines
          beginAtZero: true,
        },
      },
    },
  };

  const topLeftData = {
    labels,
    datasets: [
      {
        label: "Actual Silicon",
        data: predValue,
        backgroundColor: "red",
        borderColor: "red",
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
        backgroundColor: "red",
        borderColor: "red",
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
        backgroundColor: "red",
        borderColor: "red",
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
        backgroundColor: "red",
        borderColor: "red",
        pointHoverRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="page">
      <img src="logo.png" alt="" style={{ width: "200px" }} />
      <div className="container pt-3">
        <i className="fa fa-home fa-2x"> </i> &nbsp;
        <i className="fa fa-search-minus fa-2x"> </i> &nbsp;
        <i className="fa fa-search-plus fa-2x"> </i>
        <br />
        <br />
        <div className="row">
          <div className="col">
            <div
              style={{ border: "1px solid #292828" }}
              className="p-3"
              id="#chart1"
            >
              <Line options={options} data={topLeftData} />
            </div>
          </div>
          {/* <div className="col-sm-2"></div> */}
          <div className="col">
            <div style={{ border: "1px solid #292828" }} className="p-3">
              <Line options={options} data={topRightData} id="myChart" />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <div style={{ border: "1px solid #292828" }} className="p-3">
              <Line options={options} data={bottomLeftData} />
            </div>
          </div>
          {/* <div className="col-sm-2"></div> */}
          <div className="col">
            <div style={{ border: "1px solid #292828" }} className="p-3">
              <Line options={options} data={bottomRightData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
