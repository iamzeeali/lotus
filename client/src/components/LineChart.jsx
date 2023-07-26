import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {
  topRightGraphTypeFn,
  bottomLeftGraphTypeFn,
  bottomRightGraphTypeFn,
} from '../utils/paramterSelector';
import { allGraphs } from '../utils/graphTypes';
import {
  topRightGraphUnit,
  bottomLeftGraphUnit,
  bottomRightGraphUnit,
} from '../utils/graphUnits';
import moment from 'moment';

const LineChart = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const [reportData, setReportData] = useState([]);
  const [topRightGraphType, setTopRightGraphType] = useState('PCI');
  const [bottomLeftGraphType, setBottomLeftGraphType] =
    useState('O2 ENRICHMENT');
  const [bottomRightGraphType, setBottomRightGraphType] = useState('RAFT');
  const [latestDate, setLatestDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/report`);
        const { data } = await response.json();
        setReportData(data);
        const date = moment(data[0].TIME_LOG);
        const formattedDate = date.format('DD/MM/YYYY');
        setLatestDate(formattedDate);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataSecond = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reportSecond`);
        const { data } = await response.json();
        console.log(reportData[reportData.length - 1].TIME_LOG);

        if (data[0].TIME_LOG === reportData[reportData.length - 1].TIME_LOG) {
          console.log('No New Data');
        } else {
          setReportData((prevData) => {
            const newArray = [...prevData];
            newArray.shift();
            newArray.push(data[0]);
            console.log('New Data Came in!!');
            return newArray;
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const interval = setInterval(fetchDataSecond, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [reportData]);

  useEffect(() => {
    const labelsArray = reportData.map(
      (item) => item.FORMATTED_TIME_LOG && item.FORMATTED_TIME_LOG
    );
    const labels = labelsArray;

    const predValue = reportData.map((item) => item.PRED_SI_PER);
    const pciValue = reportData.map((item) => item.PCI);
    const o2 = reportData.map((item) => item.O2_ENRICHMENT);
    const raft = reportData.map((item) => item.RAFT);
    const hotBlastFlow = reportData.map((item) => item.HOT_BLAST_FLOW);
    const hotBlastTemp = reportData.map((item) => item.HOT_BLAST_TEMP);
    const steamTph = reportData.map((item) => item.STEAM_TPH);
    const co = reportData.map((item) => item.CO);
    const co2 = reportData.map((item) => item.CO2);
    const h2 = reportData.map((item) => item.H2);
    const topGasPR = reportData.map((item) => item.TOP_GAS_PR);
    const hotBlastPre = reportData.map((item) => item.HOT_BLAST_PRE);
    const eTaco = reportData.map((item) => item.ETACO);

    const topLeftData = {
      labels,
      datasets: [
        {
          label: 'PREDICTED SILICON',
          data: predValue,
          backgroundColor: '#f78220',
          borderColor: '#f78220',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const topRightData = {
      labels,
      datasets: [
        {
          label: topRightGraphType,
          data: topRightGraphTypeFn(
            topRightGraphType,
            hotBlastFlow,
            hotBlastTemp,
            hotBlastPre,
            steamTph,
            co,
            co2,
            h2,
            topGasPR,
            eTaco,
            pciValue,
            raft,
            o2
          ),
          backgroundColor: '#f78220',
          borderColor: '#f78220',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const bottomLeftData = {
      labels,
      datasets: [
        {
          label: bottomLeftGraphType,
          data: bottomLeftGraphTypeFn(
            bottomLeftGraphType,
            hotBlastFlow,
            hotBlastTemp,
            hotBlastPre,
            steamTph,
            co,
            co2,
            h2,
            topGasPR,
            eTaco,
            pciValue,
            raft,
            o2
          ),
          backgroundColor: '#f78220',
          borderColor: '#f78220',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    const bottomRightData = {
      labels,
      datasets: [
        {
          label: bottomRightGraphType,
          data: bottomRightGraphTypeFn(
            bottomRightGraphType,
            hotBlastFlow,
            hotBlastTemp,
            hotBlastPre,
            steamTph,
            co,
            co2,
            h2,
            topGasPR,
            eTaco,
            pciValue,
            raft,
            o2
          ),
          backgroundColor: '#f78220',
          borderColor: '#f78220',
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      backgroundColor: 'rgba(40, 40, 40, 1)',

      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
            boxWidth: 0,
            color: '#ffffff',
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },

      animation: {
        duration: 0,
      },
    };

    const config1 = {
      type: 'line',
      data: topLeftData,
      options: {
        ...options,
        scales: {
          x: {
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: 'Time (hh:mm)',
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
            suggestedMax: 2,
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: 'PERCENTAGE %',
              font: {
                size: 14,
              },
              color: '#fff',
            },
            grid: {
              display: true,
              color: 'rgba(40, 40, 40, 1)', // Customize the color of y-axis grid lines
              beginAtZero: true,
            },
          },
        },
      },
    };

    const myChart = new Chart(chartRef1.current, config1);

    const config2 = {
      type: 'line',
      data: topRightData,
      options: {
        ...options,
        scales: {
          x: {
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: 'Time (hh:mm)',
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
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: topRightGraphUnit(topRightGraphType),
              font: {
                size: 14,
              },
              color: '#fff',
            },
            grid: {
              display: true,
              color: 'rgba(40, 40, 40, 1)', // Customize the color of y-axis grid lines
              beginAtZero: true,
            },
          },
        },
      },
    };

    const myChart2 = new Chart(chartRef2.current, config2);

    const config3 = {
      type: 'line',
      data: bottomLeftData,
      options: {
        ...options,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (hh:mm)',
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
              color: 'rgba(40, 40, 40, 1)', // Customize the color of x-axis grid lines
              beginAtZero: true,
            },
          },
          y: {
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: bottomLeftGraphUnit(bottomLeftGraphType),
              font: {
                size: 14,
              },
              color: '#fff',
            },
            grid: {
              display: true,
              color: 'rgba(40, 40, 40, 1)', // Customize the color of y-axis grid lines
              beginAtZero: true,
            },
          },
        },
      },
    };

    const myChart3 = new Chart(chartRef3.current, config3);

    const config4 = {
      type: 'line',
      data: bottomRightData,
      options: {
        ...options,
        scales: {
          x: {
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: 'Time (hh:mm)',
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
            ticks: {
              color: 'white', // Set the label color here
            },
            title: {
              display: true,
              text: bottomRightGraphUnit(bottomRightGraphType),
              font: {
                size: 14,
              },
              color: '#fff',
            },
            grid: {
              display: true,
              color: 'rgba(40, 40, 40, 1)', // Customize the color of y-axis grid lines
              beginAtZero: true,
            },
          },
        },
      },
    };

    const myChart4 = new Chart(chartRef4.current, config4);

    const hover1 = (move) => {
      const points = myChart.getElementsAtEventForMode(
        move,
        'nearest',
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
        'nearest',
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
        'nearest',
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
        'nearest',
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
  }, [
    reportData,
    topRightGraphType,
    bottomLeftGraphType,
    bottomRightGraphType,
  ]);

  const handleTopRightGraphType = (event) => {
    const selectedValue = event.target.value;
    setTopRightGraphType(selectedValue);
  };
  const handleBottomLeftGraphType = (event) => {
    const selectedValue = event.target.value;
    setBottomLeftGraphType(selectedValue);
  };
  const handleBottomRightGraphType = (event) => {
    const selectedValue = event.target.value;
    setBottomRightGraphType(selectedValue);
  };

  const topRightOptions = allGraphs.filter(
    (allGraph) =>
      allGraph !== topRightGraphType &&
      allGraph !== bottomLeftGraphType &&
      allGraph !== bottomRightGraphType
  );

  console.log(reportData.length);
  return (
    <>
      <div className="page report">
        <Navbar />
        <Sidebar />
        <div
          className="px-5"
          style={{ marginLeft: '180px', paddingTop: '100px' }}
        >
          <div className="row">
            <div className="col">
              <h5 className="text-white fw-bold">
                Comparative Time Series Data Trending
              </h5>
            </div>
            <div className="col text-end">
              <h5 className="text-white fw-bold">{latestDate && latestDate}</h5>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col mt-4">
              <div
                className="p-2"
                style={{
                  backgroundColor: 'rgba(40, 40, 40, 0.4)',
                  borderRadius: '',
                }}
              >
                <canvas ref={chartRef1}></canvas>
              </div>
            </div>
            <div className="col">
              <div className="form-group" style={{ textAlign: 'right' }}>
                <select
                  value={topRightGraphType}
                  onChange={handleTopRightGraphType}
                  style={{ backgroundColor: 'grey' }}
                >
                  <option value="">{topRightGraphType}</option>
                  {topRightOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="p-2"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.4)' }}
              >
                <canvas ref={chartRef2}></canvas>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="form-group" style={{ textAlign: 'right' }}>
                <select
                  value={bottomLeftGraphType}
                  onChange={handleBottomLeftGraphType}
                  className="text-right"
                  style={{ backgroundColor: 'grey' }}
                >
                  <option value="">{bottomLeftGraphType}</option>
                  {topRightOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="p-2"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.4)' }}
              >
                <canvas ref={chartRef3}></canvas>
              </div>
            </div>
            <div className="col">
              <div className="form-group" style={{ textAlign: 'right' }}>
                <select
                  value={bottomRightGraphType}
                  onChange={handleBottomRightGraphType}
                  style={{ backgroundColor: 'grey' }}
                >
                  <option value="">{bottomRightGraphType}</option>
                  {topRightOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="p-2"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.4)' }}
              >
                <canvas ref={chartRef4}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChart;
