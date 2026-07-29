import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ChallanForm from "../components/ChallanForm";
import api from "../services/api";

type Challan = {
  id: number;
  customer: {
    customerName: string;
  };
  totalAmount: number;
  createdAt: string;
};

const Challans = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchChallans = async () => {
    try {
      const res = await api.get("/challans");
      setChallans(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this challan?")) return;

    try {
      await api.delete(`/challans/${id}`);
      fetchChallans();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchChallans();
  }, []);

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sales Challans</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + New Challan
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : challans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-5">
                    No Challans
                  </td>
                </tr>
              ) : (
                challans.map((challan) => (
                  <tr
                    key={challan.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">{challan.id}</td>

                    <td className="p-4">
                      {challan.customer.customerName}
                    </td>

                    <td className="p-4">
                      ₹{challan.totalAmount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        challan.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="text-center p-4">
                      <button
                        onClick={() => handleDelete(challan.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {showForm && (
          <ChallanForm
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              fetchChallans();
              setShowForm(false);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Challans;