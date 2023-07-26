import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import moment from 'moment';

Chart.register(...registerables);
const BarGraph = () => {
  const chartRef1 = useRef(null);
  const [reportData, setReportData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [latestDate, setLatestDate] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://10.100.76.215:5000/bar`);
        const { data } = await response.json();
        setReportData(data);
        const date = moment(data[data.length - 1].BATCH_TIME);
        const formattedDate = date.format('DD/MM/YYYY');
        setLatestDate(formattedDate);
        setisLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataSecond = async () => {
      try {
        const response = await fetch(`http://10.100.76.215:5000/barSecond`);
        const { data } = await response.json();
        // console.log(data[0].BATCH_TIME);
        // console.log(reportData[reportData.length - 1].BATCH_TIME);

        if (
          data[0].BATCH_TIME === reportData[reportData.length - 1].BATCH_TIME
        ) {
        } else {
          setReportData((prevData) => {
            const newArray = [...prevData];
            newArray.shift();
            newArray.push(data[0]);
            return newArray;
          });
          // console.log('New Data Came in!!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const interval = setInterval(fetchDataSecond, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [reportData]);

  useEffect(() => {
    const sampleId = reportData && reportData.map((item) => item.HM_SAMPLE_ID);
    setLabels(sampleId);
    const actualSilicon =
      reportData && reportData.map((item) => item.ACTUAL_SI);
    const predictedSilicon =
      reportData && reportData.map((item) => item.PRED_SI_PER);

    const topLeftData = {
      labels,
      datasets: [
        {
          label: 'ACTUAL SILICON',
          data: actualSilicon,
          backgroundColor: 'blue',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
        {
          label: 'PREDICTED SILICON',
          data: predictedSilicon,
          backgroundColor: 'red',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const footer = (tooltipItems) => {
      const siliconType = tooltipItems[0].datasetIndex;
      let sampleID = !siliconType
        ? reportData[tooltipItems[0].dataIndex].HM_SAMPLE_ID
        : reportData[tooltipItems[0].dataIndex].BATCH_ID;

      let sampleTime = !siliconType
        ? reportData[tooltipItems[0].dataIndex].HM_SAMPLE_TIME
        : reportData[tooltipItems[0].dataIndex].BATCH_TIME;
      let formattedSampleTime = moment(sampleTime).format(
        'DD-MM-YYYY HH:mm:ss'
      );
      return `Cast ID: ${tooltipItems[0].label}${!siliconType ? '' : '\n'}${
        !siliconType ? '' : 'Batch ID: '
      } ${siliconType ? sampleID : ''} \n${
        !siliconType ? 'Sample Time:' : 'Batch Time: '
      } ${formattedSampleTime}`;
    };

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      backgroundColor: 'rgba(40, 40, 40, 1)',
      scales: {
        x: {
          ticks: {
            color: 'white', // Set the label color here
          },
          title: {
            display: true,
            text: 'CAST ID',
            font: {
              size: 14,
            },
            color: '#fff',
          },
          grid: {
            display: true,
            color: 'rgba(40, 40, 40, 1)', // Customize the color of x-axis grid lines
            beginAtZero: true,
          },
        },
        y: {
          suggestedMin: 0, // Set the minimum value for the Y-axis
          suggestedMax: 2, // Set the maximum value for the Y-axis
          title: {
            display: true,
            text: 'SILICON %',
            font: {
              size: 14,
            },
            color: '#fff',
          },
          ticks: {
            color: 'white', // Set the label color here
          },
          grid: {
            display: true,
            color: 'rgba(40, 40, 40, 1)', // Customize the color of y-axis grid lines
            beginAtZero: true,
          },
        },
      },
      animation: {
        tension: {
          duration: 5000,
          easing: 'easeOutQuart',
          from: 1,
          to: 0,
          loop: true,
        },
        duration: 0,
      },

      plugins: {
        tooltip: {
          callbacks: {
            footer: footer,
          },
          // backgroundColor: 'rgba(40, 40, 40, 1)', // Background color of the tooltip
          borderColor: function (tooltipItems) {
            return tooltipItems.tooltip.labelColors[0].backgroundColor;
          },
          borderWidth: 1,
          displayColors: true,
          titleFontSize: 24,
        },
      },
    };

    const config1 = {
      type: 'bar',
      data: topLeftData,
      options: options,
    };

    const myChart = new Chart(chartRef1.current, config1);

    return () => {
      myChart.destroy();
    };
  }, [reportData]);

  const handleDate = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleDateSubmit = () => {
    setisLoading(true);
    setReportData([]);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://10.100.76.215:5000/barHistorical/${date}`
        );
        const { data } = await response.json();
        setReportData(data);
        setisLoading(false);
        const newDate = moment(data[data.length - 1].BATCH_TIME);
        const formattedDate = newDate.format('DD/MM/YYYY');
        setLatestDate(formattedDate);
        setisLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  };

  return (
    <div className="page report">
      <Navbar />
      <Sidebar />

      <div
        className="px-5"
        style={{ marginLeft: '180px', paddingTop: '100px' }}
      >
        <div className="row ">
          <div className="col">
            <h5 className="text-white fw-bold">
              Performance & Validation of SilCal Prediction
            </h5>
          </div>
          <div className="col text-end">
            <h5 className="text-white fw-bold">{latestDate && latestDate}</h5>
          </div>
        </div>
        <br />
        <input
          type="date"
          className="mx-2 form-control float-start"
          onChange={handleDate}
          value={date}
          style={{ maxWidth: '150px' }}
        />
        <input
          type="button"
          className="btn btn-secondary"
          value="Confirm"
          onClick={handleDateSubmit}
        />

        <br />
        <br />
        {isLoading ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="row mx-auto">
            <div className="col">
              <div
                className="p-5"
                style={{
                  backgroundColor: 'rgba(40, 40, 40, 0.4)',
                  borderRadius: '',
                }}
              >
                <canvas ref={chartRef1}></canvas>
              </div>
            </div>
          </div>
        )}

        <br />
      </div>
    </div>
  );
};

export default BarGraph;
