import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
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
    }, 2000); // Update every 10 seconds

    return () => {
      clearInterval(timer); // Clear the timer on unmount
    };
  }, []);

  const batchTime = reportData.map(
    (item) => item.batch_time && item.batch_time
  );

  // console.log(batchTime);

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
  };

  const topLeftData = {
    labels,
    datasets: [
      {
        label: "Actual Silicon",
        data: predValue,
        backgroundColor: "red",
        borderColor: "red",
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
      },
    ],
  };

  // useEffect(() => {
  //   if (reportData.length > 0) {
  //     const ctx = document.getElementById("myChart").getContext("2d");
  //   }
  // }, [reportData]);

  return (
    <div className="page">
      <div className="container pt-3">
        <i className="fa fa-home fa-2x"> </i> &nbsp;
        <i className="fa fa-search-minus fa-2x"> </i> &nbsp;
        <i className="fa fa-search-plus fa-2x"> </i>
        <br />
        <br />
        <div className="row">
          <div className="col">
            <div style={{ border: "1px solid gray" }}>
              <Line options={options} data={topLeftData} />
            </div>
          </div>
          {/* <div className="col-sm-2"></div> */}
          <div className="col">
            <div style={{ border: "1px solid gray" }}>
              <Line options={options} data={topRightData} />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <div style={{ border: "1px solid gray" }}>
              <Line options={options} data={bottomLeftData} />
            </div>
          </div>
          {/* <div className="col-sm-2"></div> */}
          <div className="col">
            <div style={{ border: "1px solid gray" }}>
              <Line options={options} data={bottomRightData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
