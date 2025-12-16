import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaFilter,
  FaSync,
  FaDownload,
  FaArrowUp, FaArrowDown, FaMinus,
  FaPlus,
} from "react-icons/fa";

// =======================
//  DATA (stats + items)
// =======================

const stats = [
  {
    id: 1,
    title: "Vegetables",
    avg: "$2.40",
    unit: "/kg",
    change: "+2.4%",
    icon: "🥦",
  },
  {
    id: 2,
    title: "Fruits",
    avg: "$4.10",
    unit: "/kg",
    change: "-0.8%",
    icon: "🍊",
  },
  {
    id: 3,
    title: "Dairy Products",
    avg: "$1.80",
    unit: "/ltr",
    change: "0.0%",
    icon: "🥛",
  },
  {
    id: 4,
    title: "Meat & Seafood",
    avg: "$12.50",
    unit: "/kg",
    change: "+5.1%",
    icon: "🍖",
  },
];

const itemsData = [
  {
    id: "VEG-204",
    name: "Tomato",
    category: "Vegetables",
    price: "$3.50",
    updated: "12 mins ago",
    status: "Decreasing",
    statusColor: "green",
    img: "https://th.bing.com/th/id/ODL.2be86ec5ff8ea4f9a1f5dbf6405190f6?w=310&h=198&c=7&rs=1&bgcl=ffff14&r=0&o=6&cb=ucfimg1&dpr=1.3&pid=AlgoBlockDebug&ucfimg=1",
  },
  {
    id: "MT-882",
    name: "Angus Beef Ribeye",
    category: "Meat",
    price: "$24.80",
    updated: "45 mins ago",
    status: "Increasing",
    statusColor: "red",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format",
  },
  {
    id: "FR-101",
    name: "Apples",
    category: "Fruits",
    price: "$4.20",
    updated: "1 hr ago",
    status: "Stable",
    statusColor: "yellow",
    img: "https://tse3.mm.bing.net/th/id/OIP.s6e9XUSku-MKqjOjAX74KwHaHa?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=197&h=197&c=7&dpr=1.3&o=7&rm=3",
  },
  {
    id: "DA-305",
    name: "Milk (1L)",
    category: "Dairy",
    price: "$1.95",
    updated: "2 hrs ago",
    status: "Decreasing",
    statusColor: "green",
    img: "https://th.bing.com/th/id/OIP.Bm1EJBXWNbARQPjjsov8qwAAAA?w=200&h=200&c=10&o=6&cb=ucfimg1&dpr=1.3&pid=genserp&rm=2&ucfimg=1",
  },
  {
    id: "VEG-512",
    name: "Potatoes",
    category: "Vegetables",
    price: "$1.10",
    updated: "3 hrs ago",
    status: "Stable",
    statusColor: "yellow",
    img: "https://th.bing.com/th/id/OIP._uP6Hdomrz9wErl4DP8ccwHaE8?w=265&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
  },
  // --- More Items ---
  {
    id: "FR-202",
    name: "Bananas",
    category: "Fruits",
    price: "$2.30",
    updated: "30 mins ago",
    status: "Increasing",
    statusColor: "red",
    img: "https://images.unsplash.com/photo-1574226516831-e1dff420e42e?q=80&w=800&auto=format",
  },
  {
    id: "MT-905",
    name: "Chicken Breast",
    category: "Meat",
    price: "$12.50",
    updated: "1 hr ago",
    status: "Stable",
    statusColor: "yellow",
    img: "https://images.unsplash.com/photo-1604908177521-c091e89aa61f?q=80&w=800&auto=format",
  },
  {
    id: "DA-410",
    name: "Cheddar Cheese",
    category: "Dairy",
    price: "$5.00",
    updated: "3 hrs ago",
    status: "Increasing",
    statusColor: "red",
    img: "https://images.unsplash.com/photo-1617196030846-833b35f07d62?q=80&w=800&auto=format",
  },
  {
    id: "VEG-678",
    name: "Carrots",
    category: "Vegetables",
    price: "$2.10",
    updated: "20 mins ago",
    status: "Decreasing",
    statusColor: "green",
    img: "https://images.unsplash.com/photo-1582515073490-d4a96d57e27b?q=80&w=800&auto=format",
  },
  {
    id: "FR-303",
    name: "Strawberries",
    category: "Fruits",
    price: "$6.40",
    updated: "50 mins ago",
    status: "Stable",
    statusColor: "yellow",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format",
  },
  {
    id: "DA-520",
    name: "Yogurt (500g)",
    category: "Dairy",
    price: "$3.20",
    updated: "1 hr ago",
    status: "Decreasing",
    statusColor: "green",
    img: "https://images.unsplash.com/photo-1600718373464-1e64ef4210f7?q=80&w=800&auto=format",
  },
  {
    id: "MT-678",
    name: "Pork Chops",
    category: "Meat",
    price: "$15.00",
    updated: "2 hrs ago",
    status: "Stable",
    statusColor: "yellow",
    img: "https://images.unsplash.com/photo-1601050692142-b2891e59c3b7?q=80&w=800&auto=format",
  },
];


const statusStyles = {
  green: "bg-green-100 text-green-600 border border-green-300",
  red: "bg-red-100 text-red-600 border border-red-300",
  yellow: "bg-yellow-100 text-yellow-700 border border-yellow-300",
};

/**
 * Enhanced StatusBadge for better mobile responsiveness.
 * Added 'flex items-center justify-center' for internal centering/sizing consistency.
 */
const StatusBadge = ({ color, text }) => {
  const getIcon = () => {
    if (text === "Increasing") return <FaArrowUp className="mr-1" size={10} />;
    if (text === "Decreasing") return <FaArrowDown className="mr-1" size={10} />;
    return <FaMinus className="mr-1" size={10} />;
  };

  return (
    <span
      className={`flex items-center justify-center px-2 py-0.5 sm:px-3 sm:py-1 
      rounded-full text-xs sm:text-sm whitespace-nowrap max-w-fit min-w-[70px] 
      ${statusStyles[color]}`}
    >
      {getIcon()}
      {text}
    </span>
  );
};


export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);

    // Auto create category list
  const categories = ["All", ...new Set(itemsData.map((it) => it.category))];

  // Filter logic
 const filteredItems = useMemo(() => {
  return itemsData.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(query.toLowerCase());
    const matchCategory = selectedCategory === "All" || v.category === selectedCategory;
    return matchSearch && matchCategory;
  });
  }, [query, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, page, pageSize]);



  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-100 text-black">
      <div className="max-w-[1250px] mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Market Rates
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Real-time tracking of global commodity prices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition w-full sm:w-auto justify-center">
              <FaDownload />
              <span className="text-sm">Export CSV</span>
            </button>

            {/* <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-300 transition w-full sm:w-auto justify-center">
              <FaPlus />
              <span className="text-sm">Add Item</span>
            </button> */}
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((s) => (
            <div
              key={s.id}
              // Added flex-col, h-full, and justify-between for vertical arrangement
              className="bg-white p-5 rounded-xl text-white shadow-lg border border-[gray-200] flex flex-col justify-between h-[150px]"
            >
              {/* TOP SECTION: Icon and Percentage Change */}
              <div className="flex justify-between items-start mb-2">
                {/* Icon (Left) */}
                <div 
                  className="w-12 h-12 rounded-full bg-gray-200/70 flex items-center justify-center text-3xl"
                >
                  {s.icon}
                </div>

                {/* Percentage Change (Right) */}
                <div
                  className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
                    s.change.startsWith("+")
                      ? "bg-green-600/20 text-green-400"
                      : s.change.startsWith("-")
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {s.change}
                </div>
              </div>

              {/* BOTTOM SECTION: Title and Price */}
              <div className="mt-auto"> {/* mt-auto pushes content to the bottom */}
                <div className="text-sm font-bold text-[green]">
                  {s.title}
                </div>
                <div className="text-2xl sm:text-2xl font-bold tracking-wide text-gray-400 mt-1">
                  Avg {s.avg}
                  <span className="text-sm ml-1 font-bold text-[green]">
                    {s.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="bg-white p-5 rounded-xl mb-8 border border-gray-200 flex flex-col lg:flex-row items-center gap-4 shadow">
          {/* Search */}
          <div className="flex-1 flex items-center bg-gray-100 px-4 py-3 rounded-full border border-gray-300 w-full lg:w-auto">
            <FaSearch className="text-gray-500" size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items..."
              className="bg-transparent ml-3 text-sm outline-none w-full text-black"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Date filter */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-full text-sm border border-gray-300">
              <FaCalendarAlt size={13} />
              Oct 24, 2025
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-full text-sm border border-gray-300">
              <FaFilter size={13} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-sm"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh button */}
            <button className="p-3 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200 transition">
              <FaSync size={14} />
            </button>
          </div>
        </div>

        {/* Table (Desktop) */}
        <div className="hidden lg:block bg-white rounded-xl p-6 border border-gray-200 shadow overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="text-gray-500 text-sm border-b border-gray-300">
              <tr>
                <th className="pb-4 text-left">Item Name</th>
                <th className="pb-4 text-left">Category</th>
                <th className="pb-4 text-left">Price Per Kg/Ltr</th>
                <th className="pb-4 text-left">Last Updated</th>
                <th className="pb-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {paginatedItems.map((it) => (
                <tr key={it.id} className="border-b border-gray-200">
                  <td className="py-2 flex items-center gap-4 min-w-[200px]">
                    <img
                      src={it.img}
                      alt={it.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {it.name}
                      </div>
                      <div className="text-xs text-gray-500">ID: #{it.id}</div>
                    </div>
                  </td>

                  <td className="text-gray-700">{it.category}</td>

                  <td className="font-semibold text-gray-900">{it.price}</td>

                  <td className="text-gray-500">{it.updated}</td>

                  <td>
                    <StatusBadge color={it.statusColor} text={it.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (Visible only on smaller screens) */}
        <div className="lg:hidden grid gap-4">
          {paginatedItems.map((it) => (
            <div
              key={it.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow flex flex-col gap-4"
            >
              {/* IMAGE WITH BADGE ON TOP-RIGHT */}
              <div className="relative w-full">
                <img
                  src={it.img}
                  alt={it.name}
                  className="w-full h-40 rounded-lg object-cover"
                />

                {/* BADGE TOP RIGHT */}
                <div className="absolute top-2 right-2">
                  <StatusBadge color={it.statusColor} text={it.status} />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="flex flex-col gap-2">
                <div>
                  <div className="font-semibold text-gray-900 text-lg">
                    {it.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">ID: #{it.id}</div>
                </div>

                <div className="text-sm text-gray-600">{it.category}</div>

                <div className="text-xl font-semibold text-gray-900">
                  {it.price}
                </div>

                <div className="text-xs text-gray-500 mt-1">{it.updated}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Showing results info */}
          <div className="text-gray-600 text-sm">
            Showing {paginatedItems.length} of {filteredItems.length} results
          </div>

          {/* Pagination controls */}
          <div className="flex justify-end items-center gap-2 text-sm select-none">
            {/* PREV button */}
            <span
              className={`px-3 py-1 rounded cursor-pointer ${
                page === 1
                  ? "text-gray-300"
                  : "text-gray-600 hover:text-[green] transition"
              }`}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              PREV
            </span>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-2.5 py-1 text-sm rounded border transition ${
                  page === i + 1
                    ? "bg-[green] text-white border-[green]"
                    : "text-gray-700 bg-white hover:bg-[green] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT button */}
            <span
              className={`px-3 py-1 rounded cursor-pointer ${
                page === totalPages
                  ? "text-gray-300"
                  : "text-gray-700 hover:text-[green] transition"
              }`}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              NEXT
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
