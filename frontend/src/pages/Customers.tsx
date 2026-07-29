import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CustomerForm from "../components/CustomerForm";
import api from "../services/api";

type Customer = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customers</h1>

          <button
            onClick={() => {
              setSelectedCustomer(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Customer
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Address</th>
                <th className="text-left p-4">GST</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-6">
                    No Customers Found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">{customer.customerName}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">{customer.address}</td>
                    <td className="p-4">
                      {customer.gstNumber || "-"}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
          <CustomerForm
            customer={selectedCustomer}
            onClose={() => {
              setShowForm(false);
              setSelectedCustomer(null);
            }}
            onSuccess={() => {
              fetchCustomers();
              setShowForm(false);
              setSelectedCustomer(null);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Customers;