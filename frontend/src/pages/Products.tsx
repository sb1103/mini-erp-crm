import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductForm from "../components/ProductForm";
import api from "../services/api";

type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <div>

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">SKU</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">₹{product.price}</td>
                    <td className="p-4">{product.stock}</td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
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
          <ProductForm
            product={selectedProduct}
            onClose={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
            onSuccess={() => {
              fetchProducts();
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        )}

      </div>
    </MainLayout>
  );
};

export default Products;