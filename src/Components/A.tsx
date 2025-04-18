
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = () => {
  const options = {
    title: {
      text: "Monthly Average Temperature",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [
      {
        name: "Tokyo",
        data: [
          7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
      {
        name: "London",
        data: [
          3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
        ],
      },
    ],
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
