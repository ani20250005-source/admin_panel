import React, { useState } from "react";
import { Calendar, Eye } from "lucide-react";

export default function NotificationsPage() {
  const [schedule, setSchedule] = useState(false);

  const templates = [
    {
      title: "Market Rate Update",
      desc: "New mandi rates for {commodity} available",
    },
    {
      title: "Product Approval",
      desc: "Your product {product_name} has been approved",
    },
    { title: "Order Update", desc: "Your order #{order_id} status: {status}" },
    {
      title: "Welcome Message",
      desc: "Welcome to AgroFresh! Start exploring now.",
    },
  ];

  const history = [
    {
      title: "New Product Launch",
      message: "Check out our latest organic products",
      sentTo: "All Users",
      recipients: "15,234",
      date: "2025-12-2",
      status: "Sent",
    },
    {
      title: "Market Update",
      message: "New mandi rates available for wheat",
      sentTo: "Farmers",
      recipients: "2,847",
      date: "2025-12-2",
      status: "Sent",
    },
    {
      title: "Flash Sale",
      message: "Up to 30% off on seeds this weekend",
      sentTo: "Buyers",
      recipients: "5,621",
      date: "2025-12-2",
      status: "Sent",
    },
    {
      title: "Holiday Notice",
      message: "Office closed on public holidays",
      sentTo: "All Users",
      recipients: "15,234",
      date: "2025-12-2",
      status: "Sent",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 space-y-6">
      {/* Top Stats */}
      <h2 className="text-xl font-semibold">Notifications Management</h2>
      <p className="text-sm text-gray-600">
        Send push notifications via Firebase (FCM)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Sent", value: "4,678" },
          { label: "This Month", value: "2,345" },
          { label: "Scheduled", value: "8" },
          { label: "Templates", value: "4" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 shadow rounded-lg px-4 py-3"
          >
            <p className="text-gray-500 text-xs">{stat.label}</p>
            <p className="font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      {/* Send Notification */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6 space-y-4">
        <h3 className="font-semibold text-xl">Send New Notification</h3>

        <div>
          <p className="text-sm mb-1 text-black">Title *</p>
          <input
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
            placeholder="Enter notification title"
          />
        </div>

        <div>
          <p className="text-sm mb-1 text-black">Message *</p>
          <textarea
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm h-24"
            placeholder="Enter notification message"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm mb-1 text-black">Send To *</p>
            <select className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm">
              <option>All Users</option>
              <option>Farmers</option>
              <option>Buyers</option>
            </select>
          </div>

          <div>
            <p className="text-sm mb-1 text-black">Image (Optional)</p>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={schedule}
            onChange={() => setSchedule(!schedule)}
          />
          <p className="text-xs text-gray-600">Schedule for later</p>
        </div>

        {schedule && (
          <input
            type="datetime-local"
            className="w-full border rounded-md px-2 py-2 text-sm"
          />
        )}

        <div className="flex gap-4 justify-between">
          <button className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium">
            Save as Template
          </button>

          <button className="bg-green-500 text-white px-5 py-2 rounded-md text-sm font-medium">
            Send Now
          </button>
        </div>
      </div>
      {/* Templates */}
      <div className="bg-white shadow rounded-md p-4 md:p-6 space-y-4">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-4">
          Saved Templates
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
          {templates.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-300 rounded-lg p-3 hover:shadow"
            >
              <p className="text-md font-semibold">{t.title}</p>
              <p className="text-sm text-gray-500">{t.desc}</p>
              <button className="text-sm text-green-600 mt-2 underline-none hover:underline">
                Use
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        {/* Notification History */}
        <h3 className="text-xl font-semibold mb-4">Notification History</h3>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-lg">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-md text-gray-600">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Sent To</th>
                <th className="p-3 text-left">Recipients</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-2">{row.title}</td>
                  <td className="p-2">{row.message}</td>
                  <td className="p-2">{row.sentTo}</td>
                  <td className="p-2">{row.recipients}</td>
                  <td className="p-2">{row.date}</td>
                  <td className="p-2 text-green-600">{row.status}</td>
                  <td className="p-2">
                    <Eye size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-3">
          {history.map((row, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 text-xs">
              <p className="font-semibold">{row.title}</p>
              <p>{row.message}</p>
              <p>
                <span className="font-medium">Sent to:</span> {row.sentTo}
              </p>
              <p>
                <span className="font-medium">Recipients:</span>
                {row.recipients}
              </p>
              <p>
                <span className="font-medium">Date:</span> {row.date}
              </p>
              <p className="text-green-600 font-semibold">{row.status}</p>
              <div className="flex justify-end mt-2">
                <Eye size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
