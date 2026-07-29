import { useState } from "react";
import api from "../services/api";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const CustomerForm = ({ onClose, onSuccess }: Props) => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/customers", {
        customerName,
        email,
        phone,
        address,
        gstNumber,
      });

      onSuccess();
      onClose();
    }catch (err: any) {
  console.log("Full Error:", err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Response:", err.response.data);
    alert(JSON.stringify(err.response.data));
  } else {
    alert(err.message);
  }
}
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-lg p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Add Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border rounded-lg p-3"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-lg p-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded-lg p-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="GST Number"
            className="w-full border rounded-lg p-3"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CustomerForm;