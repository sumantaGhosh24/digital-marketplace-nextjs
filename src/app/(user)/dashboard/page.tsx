import {redirect} from "next/navigation";

import {getUser} from "@/actions/userActions";
import {getAdminDashboard, getDashboard} from "@/actions/dashboardActions";

import UserDashboardCharts from "./_components/user-dashboard-charts";
import AdminDashboardCharts from "./_components/admin-dashboard-charts";

export const metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const user = await getUser();
  if (!user) redirect("/");

  const userDashboardData = await getDashboard();
  const adminDashboardData = await getAdminDashboard();

  return (
    <>
      <UserDashboardCharts data={userDashboardData} />
      {user.role === "admin" && (
        <AdminDashboardCharts data={adminDashboardData} />
      )}
    </>
  );
};

export default Dashboard;
