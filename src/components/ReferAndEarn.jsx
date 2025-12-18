import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  Users,
  UserPlus,
  DollarSign,
} from "lucide-react";

const ReferAndEarn = () => {
  const [expandedVendor, setExpandedVendor] = useState("VD001"); // Default open first one

  const stats = [
    {
      label: "Total Vendors",
      value: "6",
      icon: <Users size={20} className="text-gray-400" />,
    },
    {
      label: "Total Customers Referred",
      value: "23",
      icon: <UserPlus size={20} className="text-gray-400" />,
    },
    {
      label: "Total Rewards",
      value: "$5,750",
      icon: <DollarSign size={20} className="text-gray-400" />,
    },
  ];

  const vendors = [
    {
      id: "VD001",
      name: "Acme Electronics",
      phone: "123 456 7890",
      referred: 5,
      reward: "$1,250",
      status: "Active",
    },
    {
      id: "VD004",
      name: "Bright Future Ventures",
      phone: "123 456 7900",
      referred: 8,
      reward: "$2,000",
      status: "Active",
    },
    {
      id: "VD006",
      name: "Digital Dynamics",
      phone: "123 456 7912",
      referred: 1,
      reward: "$250",
      status: "Pending",
    },
    {
      id: "VD003",
      name: "Global Marketing Inc",
      phone: "123 456 7898",
      referred: 2,
      reward: "$500",
      status: "Pending",
    },
    {
      id: "VD005",
      name: "Sunrise Retail",
      phone: "123 456 7908",
      referred: 4,
      reward: "$1,000",
      status: "Active",
    },
  ];

  const customers = [
    {
      id: "C001",
      name: "John Doe",
      phone: "123 456 7890",
      date: "Dec 1, 2024",
      reward: "$250",
    },
    {
      id: "C002",
      name: "Jane Smith",
      phone: "123 456 7891",
      date: "Dec 5, 2024",
      reward: "$250",
    },
    {
      id: "C003",
      name: "Bob Johnson",
      phone: "123 456 7892",
      date: "Dec 10, 2024",
      reward: "$250",
    },
    {
      id: "C004",
      name: "Alice Williams",
      phone: "123 456 7893",
      date: "Dec 12, 2024",
      reward: "$250",
    },
    {
      id: "C005",
      name: "Charlie Brown",
      phone: "123 456 7894",
      date: "Dec 15, 2024",
      reward: "$250",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">Refer & Earn</h1>
        <p className="text-md text-gray-500">
          View vendors and their referred customers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="text-md font-semibold text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div
        className="flex flex-col gap-4 mb-6 w-full
                md:flex-row md:items-center md:justify-between"
      >
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by vendor name, mobile number, or customer name..."
            className="w-full pl-10 pr-4 py-2
                 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-1 focus:ring-blue-500
                 text-sm"
          />
        </div>

        {/* Buttons Group */}
        <div
          className="flex flex-col gap-2 w-full
                  sm:flex-row sm:justify-end
                  md:w-auto md:gap-3"
        >
          <button
            className="flex items-center justify-center gap-2
                 w-full sm:w-auto
                 px-4 py-2
                 border border-gray-300 rounded-md
                 bg-white text-sm hover:bg-gray-50"
          >
            <Filter size={16} />
            <span>All Status</span>
            <ChevronDown size={14} />
          </button>

          <button
            className="flex items-center justify-center gap-2
                 w-full sm:w-auto
                 px-4 py-2
                 border border-gray-300 rounded-md
                 bg-white text-sm hover:bg-gray-50"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
              <tr>
                <th className="p-4 font-semibold">Vendor Name</th>
                <th className="p-4 font-semibold">Vendor Mobile Number</th>
                <th className="p-4 font-semibold">Referred</th>
                <th className="p-4 font-semibold">Reward</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <React.Fragment key={vendor.id}>
                  <tr
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      expandedVendor === vendor.id ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold text-black-700">
                            {vendor.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {vendor.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{vendor.phone}</td>
                    <td className="p-4 text-blue-600 font-medium underline cursor-pointer">
                      {vendor.referred} customers
                    </td>
                    <td className="p-4 font-bold text-green-600">
                      {vendor.reward}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vendor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="text-gray-500 hover:text-blue-600 flex items-center gap-1 mx-auto text-xs"
                        onClick={() =>
                          setExpandedVendor(
                            expandedVendor === vendor.id ? null : vendor.id
                          )
                        }
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Customer Details */}
                  {expandedVendor === vendor.id && (
                    <tr>
                      <td colSpan="6" className="p-6 bg-blue-50/50">
                        <div className="bg-white rounded-lg border border-blue-100 overflow-hidden shadow-sm">
                          <p className="p-3 text-xs font-bold text-gray-600 bg-blue-50/50">
                            Referred Customers
                          </p>
                          <table className="w-full text-left text-xs">
                            <thead className="border-b border-blue-100 text-gray-500">
                              <tr>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Mobile Number</th>
                                <th className="p-3 text-center">
                                  Date Referred
                                </th>
                                <th className="p-3 text-right">Reward</th>
                              </tr>
                            </thead>
                            <tbody>
                              {customers.map((cust) => (
                                <tr
                                  key={cust.id}
                                  className="border-b border-gray-50 last:border-0"
                                >
                                  <td className="p-3">
                                    <div className="font-semibold">
                                      {cust.name}
                                    </div>
                                    <div className="text-[10px] text-gray-400">
                                      {cust.id}
                                    </div>
                                  </td>
                                  <td className="p-3 text-gray-600">
                                    {cust.phone}
                                  </td>
                                  <td className="p-3 text-center text-gray-500">
                                    📅 {cust.date}
                                  </td>
                                  <td className="p-3 text-right font-bold text-green-600">
                                    {cust.reward}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-black-700">{vendor.name}</h3>
                  <p className="text-xs text-gray-400">{vendor.id}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    vendor.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {vendor.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="text-gray-500 text-xs">
                  Phone:{" "}
                  <span className="text-gray-800 block">{vendor.phone}</span>
                </div>
                <div className="text-gray-500 text-xs">
                  Reward:{" "}
                  <span className="text-green-600 font-bold block">
                    {vendor.reward}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  setExpandedVendor(
                    expandedVendor === vendor.id ? null : vendor.id
                  )
                }
                className="w-full py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded flex items-center justify-center gap-2"
              >
                <Eye size={14} /> View Customers
              </button>

              {expandedVendor === vendor.id && (
                <div className="mt-4 space-y-2">
                  {customers.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-between items-center text-xs"
                    >
                      <div>
                        <p className="font-bold">{c.name}</p>
                        <p className="text-gray-400">{c.date}</p>
                      </div>
                      <p className="font-bold text-green-600">{c.reward}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">Showing 1 to 5 of 6 vendors</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-400 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-900 text-white rounded text-xs">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;
