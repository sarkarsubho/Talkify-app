import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { litePurple, orange, purple } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
    },
  },
};

const labels = getLast7Days();

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "revenue",
        fill: true,
        backgroundColor: litePurple,
        borderColor: purple,
      },
      // {
      //   data: [1, 9, 1, 19],
      //   label: "revenue",
      //   fill: true,
      //   backgroundColor: "rgba(75,192,192,0.5)",
      //   borderColor: "rgba(75,192,192,0.3)",
      // },
      // {
      //   data: [1, 10, 28, 9],
      //   label: "revenue",
      //   fill: true,
      //   backgroundColor: "rgba(75,102,12,0.5)",
      //   borderColor: "rgba(75,12,12,0.3)",
      // },
    ],
  };
  return <Line data={data} options={lineChartOptions}></Line>;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Group chats VS Personal chat",
        fill: true,
        backgroundColor: [litePurple, orange],
        hoverBackgroundColor: ["red", "green"],
        borderColor: [purple, orange],
        offset: 10,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };
