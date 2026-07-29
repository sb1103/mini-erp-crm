import { useEffect, useState } from "react";
import api from "../services/api";

type Customer = {
  id: number;
  customerName: string;
};

type Product = {
  id: number;
  name: string;
  stock: number;
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const ChallanForm = ({ onClose, onSuccess }: Props) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customerRes = await api.get("/customers");
      const productRes = await api.get("/products");

      setCustomers(customerRes.data.data);
      setProducts(productRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/challans", {
        customerId: Number(customerId),
        items: [
          {
            productId: Number(productId),
            quantity: Number(quantity),
          },
        ],
      });

      onSuccess();
    } catch (err: any) {
      console.log(err);

      alert(
        err?.response?.data?.message || "Failed to create challan"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Create Sales Challan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            className="w-full border rounded-lg p-3"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customerName}
              </option>
            ))}
          </select>

          <select
            className="w-full border rounded-lg p-3"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            className="w-full border rounded-lg p-3"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Challan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ChallanForm;