import { useEffect, useState } from "react";
import api from "../services/api";

type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
};

type Props = {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

const ProductForm = ({
  product,
  onClose,
  onSuccess,
}: Props) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    } else {
      setName("");
      setSku("");
      setPrice("");
      setStock("");
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
      };

      if (product) {
        await api.put(`/products/${product.id}`, data);
      } else {
        await api.post("/products", data);
      }

      onSuccess();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {product ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default ProductForm;