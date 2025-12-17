import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function AllProducts() {
  const navigate = useNavigate();

  const categories = ["All Categories", "Vegetables", "Fruits", "Meat", "Seafood"];
  const sortOptions = [
    "Most Popular",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const [products, setProducts] = useState([
    {
      name: "Kids Black Leather Turin II AC PS Sneakers",
      image:
        "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
      price: 80,
      merchant: "Green Farm Store",
      added: "03 Feb 2020",
      stock: 100,
      category: "Vegetables",
      rating: 4.0,
    },
    {
      name: "Men’s The 500-Day T-Shirt",
      image:
        "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
      price: 85,
      merchant: "Green Farm Store",
      added: "26 Dec 2020",
      stock: 58,
      category: "Vegetables",
      rating: 4.5,
    },
    {
      name: "Probass Boost Wireless Bluetooth Headphones - Black",
      image:
        "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
      price: 345,
      merchant: "Fresh Farm Shop",
      added: "12 Apr 2021",
      stock: 27,
      category: "Vegetables",
      rating: 5.0,
    },
  ]);

  const handleDelete = (index) => {
  const ok = window.confirm("Are you sure you want to delete this product?");
  if (!ok) return;

  const deletedItem = products[index];

  // 🔹 get old deleted products
  const oldDeleted = JSON.parse(localStorage.getItem("deletedProducts")) || [];

  // 🔹 add new deleted product
  localStorage.setItem(
    "deletedProducts",
    JSON.stringify([...oldDeleted, deletedItem])
  );

  // 🔹 remove from all products
  setProducts((prev) => prev.filter((_, i) => i !== index));
};

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All Categories" || p.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.merchant.toLowerCase().includes(q) ||
        String(p.price).includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = [...list].reverse();

    return list;
  }, [products, selectedCategory, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  if (page > totalPages) setPage(1);

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          All Products ({filtered.length})
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, merchant or price"
            className="w-full sm:w-64 lg:w-80 px-3 py-2 border rounded-lg text-sm shadow-sm outline-none" />
          <select className="border px-3 py-2 rounded-lg text-sm"
            value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} >
            {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="border px-3 py-2 rounded-lg text-sm"
            value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }} >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
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
            {paginated.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 text-gray-600">
                <td className="px-4 py-3 flex gap-3 items-center">
                  <img className="w-10 h-10 rounded border object-cover" src={p.image} alt={p.name} />
                  <div className="font-medium text-gray-800">{p.name}</div>
                </td>
                <td className="px-4 py-3">₹{p.price}</td>
                <td className="px-4 py-3">{p.merchant}</td>
                <td className="px-4 py-3">{p.added}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-green-600">⭐ {p.rating}</td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/product/${i}`)}
                    className="px-3 py-1 text-xs border rounded-md text-[green] border-[green]"
                  >
                    View Detail
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="px-2 py-1 border rounded-md text-red-600 border-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginated.map((p, idx) => (
          <div key={idx} className="bg-white shadow-sm rounded-lg p-4 border">
            <h3 className="font-semibold">{p.name}</h3>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => navigate(`/product/${idx}`)}
                className="w-full px-3 py-2 text-sm border rounded-md text-[green] border-[green]"
              >
                View Detail
              </button>

              <button
                onClick={() => handleDelete(idx)}
                className="px-3 py-2 border rounded-md text-red-600 border-red-600"
              >
                <Trash2 size={16} />
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
