"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {Bar, Pie} from "react-chartjs-2";

import {IUser} from "@/models/userModel";
import {IProduct} from "@/models/productModel";
import {IOrder} from "@/models/orderModel";
import {IReview} from "@/models/reviewModel";
import {ICategory} from "@/models/categoryModel";
import {Card} from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardDataProps {
  data: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalReviews: number;
    totalCategories: number;
    recentUsers: IUser[];
    recentProducts: IProduct[];
    recentOrders: IOrder[];
    recentReviews: IReview[];
    recentCategories: ICategory[];
    totalRevenue: number;
  };
}

const AdminDashboardCharts = ({
  data: {
    totalUsers,
    totalProducts,
    totalOrders,
    totalReviews,
    totalCategories,
    recentUsers,
    recentProducts,
    recentOrders,
    recentReviews,
    recentCategories,
    totalRevenue,
  },
}: DashboardDataProps) => {
  const userStatusData = {
    labels: ["Total Users"],
    datasets: [
      {
        label: "User Status",
        data: [totalUsers],
        backgroundColor: ["rgba(54, 162, 235, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  const productOrderReviewCategoryData = {
    labels: ["Products", "Orders", "Reviews", "Categories"],
    datasets: [
      {
        label: "Counts",
        data: [totalProducts, totalOrders, totalReviews, totalCategories],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ["Total Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [totalRevenue],
        backgroundColor: ["rgba(75, 192, 192, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "User Status",
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Overview",
      },
    },
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total Revenue",
      },
    },
  };

  return (
    <div className="container mx-auto bg-white dark:bg-black text-black dark:text-white rounded-md shadow-lg shadow-black dark:shadow-white p-5 my-10 space-y-5">
      <Pie data={userStatusData} options={pieChartOptions} />
      <Bar data={productOrderReviewCategoryData} options={barChartOptions} />
      <Bar data={revenueData} options={revenueChartOptions} />
      {recentUsers.length > 0 && (
        <Card className="p-3">
          <h3 className="text-lg font-semibold mb-2">Recent Users</h3>
          <ul>
            {recentUsers.map((user) => (
              <li key={user._id}>{user.name || user.email}</li>
            ))}
          </ul>
        </Card>
      )}
      {recentProducts.length > 0 && (
        <Card className="p-3">
          <h3 className="text-lg font-semibold mb-2">Recent Products</h3>
          <ul>
            {recentProducts.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboardCharts;
