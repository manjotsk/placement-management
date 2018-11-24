import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";


// core components

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart
} from "./var/charts";


class Charts extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ChartistGraph
          className="ct-chart-white-colors"
          data={roundedLineChart.data}
          type="Line"
          options={roundedLineChart.options}
          listener={roundedLineChart.animation}
        />
      </div>
    );
  }
}

export default Charts;
