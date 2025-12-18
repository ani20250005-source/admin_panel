import React, { useEffect, useState } from "react";

export default function DeletedProducts() {
  const [deletedProducts, setDeletedProducts] = useState([]);

  // 🔹 load deleted products
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("deletedProducts")) || [];
    setDeletedProducts(data);
  }, []);

  const handleAddBack = (index) => {
    const product = deletedProducts[index];

    // remove from deleted list
    const updatedDeleted = deletedProducts.filter((_, i) => i !== index);
    setDeletedProducts(updatedDeleted);
    localStorage.setItem("deletedProducts", JSON.stringify(updatedDeleted));

    // add back to all products
    const allProducts =
      JSON.parse(localStorage.getItem("allProducts")) || [];
    localStorage.setItem(
      "allProducts",
      JSON.stringify([...allProducts, product])
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6">
        Deleted Products ({deletedProducts.length})
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 font-semibold text-gray-600 text-xs">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Merchant</th>
              <th className="px-4 py-3">Added Date</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {deletedProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No deleted products
                </td>
              </tr>
            ) : (
              deletedProducts.map((p, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 text-gray-600">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-3">₹{p.price}</td>
                  <td className="px-4 py-3">{p.merchant}</td>
                  <td className="px-4 py-3">{p.added}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 text-green-600">
                    ⭐ {p.rating}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleAddBack(i)}
                      className="px-3 py-1 text-xs border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {deletedProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
            No deleted products
          </div>
        ) : (
          deletedProducts.map((p, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-lg p-4 border"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">
                  {p.name}
                </h3>
                <span className="font-semibold text-gray-700">
                  ₹{p.price}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <div>{p.merchant}</div>
                <div className="text-xs">
                  {p.added} • {p.category}
                </div>
                <div className="text-green-600 text-xs font-medium">
                  ⭐ {p.rating} • {p.stock} in stock
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleAddBack(i)}
                  className="w-full px-3 py-2 text-sm border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
                >
                  Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
