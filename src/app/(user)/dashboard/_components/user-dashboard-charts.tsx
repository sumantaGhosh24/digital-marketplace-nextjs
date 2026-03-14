"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserDashboardDataProps {
  data: {
    totalReviews: number;
    totalOrders: number;
    totalOrderPrice: number;
  };
}

const UserDashboardCharts = ({
  data: {totalReviews, totalOrders, totalOrderPrice},
}: UserDashboardDataProps) => {
  const orderSummaryData = {
    labels: ["Total Orders", "Total Reviews"],
    datasets: [
      {
        label: "User Activity",
        data: [totalOrders, totalReviews],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(75, 192, 192, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  const orderSummaryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "User Data",
      },
    },
  };

  return (
    <div className="container mx-auto rounded-md shadow-md dark:shadow-gray-400 p-5 my-10">
      <Bar data={orderSummaryData} options={orderSummaryOptions} />
      <h2>Total Spend: ₹{totalOrderPrice}</h2>
    </div>
  );
};

export default UserDashboardCharts;
