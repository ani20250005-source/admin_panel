import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


export default function AllProducts() {
  const navigate = useNavigate();

  const categories = ["All Categories", "Vegetables", "Fruits", "Meat", "Seafood"];
  const sortOptions = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const products = [
    { name: "Kids Black Leather Turin II AC PS Sneakers", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 80, merchant: "Green Farm Store", added: "03 Feb 2020", stock: 100, category: "Vegetables", rating: 4.0 },
    { name: "Men’s The 500-Day T-Shirt", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 85, merchant: "Green Farm Store", added: "26 Dec 2020", stock: 58, category: "Vegetables", rating: 4.5 },
    { name: "Probass Boost Wireless Bluetooth Headphones - Black", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 345, merchant: "Fresh Farm Shop", added: "12 Apr 2021", stock: 27, category: "Vegetables", rating: 5.0 },
    { name: "Half Sleeve Frock for Baby Girls", image: "https://th.bing.com/th/id/OIP.QV9nLsosd2GuFfqmwBD7NAHaF0?w=236&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 210, merchant: "Meat Shop", added: "19 Oct 2021", stock: 89, category: "Meat", rating: 4.5 },
    { name: "Textile Regular Lace Up Mens Sneakers", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 60, merchant: "Fresh Farm Shop", added: "21 Jan 2021", stock: 58, category: "Vegetables", rating: 3.5 },
    { name: "Water-resistant School Backpack Travel Bag", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 735, merchant: "Fresh Farm Shop", added: "05 May 2021", stock: 83, category: "Vegetables", rating: 4.0 },
    { name: "Stewit Pop it for Kids", image: "https://th.bing.com/th/id/OIP.pWLz7mvC_jbYRoWFV3F3UAHaE8?w=241&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 250, merchant: "Seafood store", added: "10 Dec 2021", stock: 23, category: "Seafood", rating: 4.5 },
    { name: "Stewit Pop it for Kids", image: "https://th.bing.com/th/id/OIP.QV9nLsosd2GuFfqmwBD7NAHaF0?w=236&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 100, merchant: "Meat Shop", added: "25 Feb 2020", stock: 93, category: "Meat", rating: 5.0 },
    { name: "Metrix High Back Chair With Adjustable Handle", image: "https://th.bing.com/th/id/OIP.QV9nLsosd2GuFfqmwBD7NAHaF0?w=236&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 210, merchant: "Meat Shop", added: "09 Jun 2021", stock: 52, category: "Meat", rating: 4.5 },
    { name: "GRANITE X40 24T - BLUE RED", image: "https://th.bing.com/th/id/OIP.9sJWqoUTpTgUWfJQkgSSRAHaEO?w=308&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 230, merchant: "Fruits Store", added: "17 Jul 2020", stock: 66, category: "Fruits", rating: 5.0 },
    { name: "Wireless - 2.40 Ghz - Scroll Wheel - Symmetrical", image: "https://th.bing.com/th/id/OIP.9sJWqoUTpTgUWfJQkgSSRAHaEO?w=308&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 80, merchant: "Fruits Store", added: "28 Aug 2021", stock: 90, category: "Fruits", rating: 4.0 },
    { name: "Electric 1000 Watts DIFPI08P Dress Dry Iron", image: "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1", price: 70, merchant: "Green Farm Store", added: "31 Jan 2021", stock: 110, category: "Vegetables", rating: 4.5 },
    { name: "Skin Brightening Face Wash For Reducing Pigmentation", image: "https://th.bing.com/th/id/OIP.9sJWqoUTpTgUWfJQkgSSRAHaEO?w=308&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", price: 150, merchant: "Fruits Store", added: "17 Feb 2020", stock: 22, category: "Fruits", rating: 5.0 }
  ];

  // Filtered + searched list (memoized)
  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.merchant.toLowerCase().includes(q) ||
        String(p.price).includes(q);
      return matchesCategory && matchesSearch;
    });

    // Sorting (basic)
    if (sortBy === "Price: Low to High") list = list.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") list = list.sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") list = list.slice().reverse(); // crude newest
    // Most Popular left as original order

    return list;
  }, [products, selectedCategory, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Make sure page in range after filters change
  if (page > totalPages) setPage(1);

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">All Products ({filtered.length})</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, merchant or price"
            className="w-full sm:w-64 lg:w-80 px-3 py-2 border rounded-lg text-sm shadow-sm outline-none"
          />

          <select
            className="border px-3 py-2 rounded-lg text-sm"
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          >
            {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            className="border px-3 py-2 rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
          >
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
            {paginated.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">No products found.</td></tr>
            ) : (
              paginated.map((p, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 text-gray-600 text-sm">
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <img className="w-10 h-10 rounded border border-gray-200 object-cover" src={p.image} alt={p.name} />
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-400">09324893092</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">₹{p.price}</td>
                  <td className="px-4 py-3">{p.merchant}</td>
                  <td className="px-4 py-3">{p.added}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">⭐ {p.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/product/${i}`)}
                      className="px-3 py-1 text-xs border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginated.length === 0 ? (
          <div className="p-6 text-center text-gray-500 bg-white rounded-lg">No products found.</div>
        ) : (
          paginated.map((p, idx) => (
            <div key={idx} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded object-cover border border-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    <div className="text-sm text-gray-500">₹{p.price}</div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <div>{p.merchant}</div>
                    <div className="text-xs">{p.added} • {p.category}</div>
                    <div className="text-xs text-green-600 font-medium">⭐ {p.rating} • {p.stock} in stock</div>
                  </div>

                  <div className="mt-3">
                      <button
                        onClick={() => navigate(`/product/${idx}`)}
                        className="w-full px-3 py-2 text-sm border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
                      >
                        View Detail
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-[green] disabled:hover:text-inherit"
        >
          Prev
        </button>

        {/* page numbers (show up to 5 pages with sliding window) */}
        {(() => {
          const pages = [];
          const maxShown = 5;
          let start = Math.max(1, page - Math.floor(maxShown / 2));
          let end = start + maxShown - 1;
          if (end > totalPages) { end = totalPages; start = Math.max(1, end - maxShown + 1); }
          for (let i = start; i <= end; i++) {
            pages.push(i);
          }
          return pages.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 border rounded-md ${page === num ? "bg-[green] text-white" : "hover:bg-[green] hover:text-white"}`}
            >
              {num}
            </button>
          ));
        })()}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-[green] disabled:hover:text-inherit"
        >
          Next
        </button>
      </div>
    </div>
  );
}
