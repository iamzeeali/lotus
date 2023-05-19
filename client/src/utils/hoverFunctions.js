export const hover1 = (move, myChart, myChart2) => {
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
    myChart2.setActiveElements([{ datasetIndex: dataset, index: datapoint }]);
    myChart2.update();
  }
};
