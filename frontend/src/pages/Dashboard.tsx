import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import {
  FaUsers,
  FaBoxOpen,
  FaFileInvoice,
  FaRupeeSign,
} from "react-icons/fa";

type DashboardData = {
  totalCustomers: number;
  totalProducts: number;
  totalChallans: number;
  totalRevenue: number;
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    totalCustomers: 0,
    totalProducts: 0,
    totalChallans: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Customers</p>
                <h2 className="text-4xl font-bold mt-2">
                  {data.totalCustomers}
                </h2>
              </div>

              <FaUsers className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Products</p>
                <h2 className="text-4xl font-bold mt-2">
                  {data.totalProducts}
                </h2>
              </div>

              <FaBoxOpen className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Challans</p>
                <h2 className="text-4xl font-bold mt-2">
                  {data.totalChallans}
                </h2>
              </div>

              <FaFileInvoice className="text-orange-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Revenue</p>
                <h2 className="text-4xl font-bold mt-2">
                  ₹{data.totalRevenue}
                </h2>
              </div>

              <FaRupeeSign className="text-purple-600" size={40} />
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;