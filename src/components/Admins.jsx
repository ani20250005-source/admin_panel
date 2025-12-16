import { useState } from "react";
import { Plus, Edit, Trash2, Shield, Eye, X } from "lucide-react";

const adminsData = [
  { id: 1, name: "Super Admin", email: "admin@agroplatform.com", role: "Super Admin", permissions: "All", lastLogin: "2024-11-26 10:30 AM", status: "active" },
  { id: 2, name: "Rahul Verma", email: "rahul@agroplatform.com", role: "Content Manager", permissions: "CMS, Notifications", lastLogin: "2024-11-25 04:15 PM", status: "active" },
  { id: 3, name: "Priya Singh", email: "priya@agroplatform.com", role: "User Manager", permissions: "Users, KYC", lastLogin: "2024-11-26 09:00 AM", status: "active" },
  { id: 4, name: "Amit Kumar", email: "amit@agroplatform.com", role: "Support Manager", permissions: "Tickets, Support", lastLogin: "2024-11-24 02:30 PM", status: "inactive" },
];

const roles = [
  { name: "Super Admin", permissions: ["All Permissions"] },
  { name: "Content Manager", permissions: ["Website CMS", "Notifications", "Banners"] },
  { name: "User Manager", permissions: ["Farmers", "Sellers", "Buyers", "KYC Approval"] },
  { name: "Product Manager", permissions: ["Products", "Categories", "Approvals"] },
  { name: "Support Manager", permissions: ["Tickets", "Support", "Disputes"] },
];

export default function AdminsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Admin Management</h2>
          <p className="text-gray-600 text-sm">Manage sub-admins and role permissions (RBAC)</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[green] text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Sub-Admin
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Admins", value: "12" },
          { title: "Active Today", value: "8", color: "text-green-600" },
          { title: "Total Roles", value: "5" },
          { title: "Inactive", value: "4" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">{item.title}</p>
            <p className={`mt-1 font-semibold ${item.color || ""}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Admin Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Name", "Email", "Role", "Permissions", "Last Login", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-gray-600">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adminsData.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    {admin.name}
                  </td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{admin.permissions}</td>
                  <td className="px-6 py-4 text-sm">{admin.lastLogin}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        admin.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => setSelectedAdmin(admin)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    {admin.role !== "Super Admin" && (
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {adminsData.map((admin) => (
          <div key={admin.id} className="bg-white border rounded-lg shadow-sm p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{admin.name}</h3>
              <div className="flex gap-2">
                <Eye
                  className="w-4 h-4 text-blue-500 cursor-pointer"
                  onClick={() => setSelectedAdmin(admin)}
                />
                <Edit className="w-4 h-4 text-green-500 cursor-pointer" />
                {admin.role !== "Super Admin" && <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{admin.email}</p>
            <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 inline-block rounded">{admin.role}</p>
            <p className="text-gray-700 text-sm">{admin.permissions}</p>
            <p className="text-gray-500 text-xs">{admin.lastLogin}</p>
            <p
              className={`text-xs inline-block px-2 py-1 rounded ${
                admin.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
              }`}
            >
              {admin.status}
            </p>
          </div>
        ))}
      </div>

      {/* Roles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Roles & Permissions</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{role.name}</h4>
                <button className="text-[green] text-sm">Edit</button>
              </div>
              {role.permissions.map((p, idx) => (
                <div key={idx} className="flex gap-2 items-center text-gray-700 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {p}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold">Add Sub-Admin</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              {["Name", "Email", "Password"].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1">{field}</label>
                  <input
                    type={field === "Password" ? "password" : "text"}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500"
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm mb-1">Role</label>
                <select className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500">
                  <option>Select...</option>
                  {roles.map((r, idx) => (
                    <option key={idx}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 border py-2 rounded" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="flex-1 bg-[green] text-white py-2 rounded hover:bg-green-600">
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Details Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Admin Details</h3>
              <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => setSelectedAdmin(null)} />
            </div>
            <div className="space-y-3">
              {["Name", "Email", "Role", "Permissions", "Last Login"].map((label) => (
                <div key={label}>
                  <p className="text-sm text-gray-600">{label}</p>
                  <p>{selectedAdmin[label.toLowerCase().replace(" ", "")]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
