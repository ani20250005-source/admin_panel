import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const customersData = [
  {
    id: 1,
    name: "Kevin Pollard",
    phone: "+91-888-777-0080",
    email: "kevin.pollard@example.com",
    memberSince: "18 Jun 2021",
    items: 5,
    points: 2500,
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Greg Roy",
    phone: "+91-888-777-0081",
    email: "greg.roy@example.com",
    memberSince: "22 May 2020",
    items: 2,
    points: 1200,
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "John Coleman",
    phone: "+91-888-777-0082",
    email: "john.coleman@example.com",
    memberSince: "03 Feb 2020",
    items: 3,
    points: 800,
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Malcolm Hoffman",
    phone: "+91-888-777-0083",
    email: "malcolm.hoffman@example.com",
    memberSince: "31 Dec 2021",
    items: 6,
    points: 1500,
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Alvin Mccarthy",
    phone: "+91-888-777-0084",
    email: "alvin.mccarthy@example.com",
    memberSince: "15 Oct 2021",
    items: 2,
    points: 1200,
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Sarah Connor",
    phone: "+91-888-777-0085",
    email: "sarah.connor@example.com",
    memberSince: "05 Jan 2022",
    items: 4,
    points: 1800,
    img: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Michael Smith",
    phone: "+91-888-777-0086",
    email: "michael.smith@example.com",
    memberSince: "17 Mar 2019",
    items: 2,
    points: 900,
    img: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Jessica Brown",
    phone: "+91-888-777-0087",
    email: "jessica.brown@example.com",
    memberSince: "29 Jul 2020",
    items: 3,
    points: 1100,
    img: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Daniel Williams",
    phone: "+91-888-777-0088",
    email: "daniel.williams@example.com",
    memberSince: "11 Nov 2021",
    items: 6,
    points: 2700,
    img: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Emily Johnson",
    phone: "+91-888-777-0089",
    email: "emily.johnson@example.com",
    memberSince: "23 Aug 2018",
    items: 1,
    points: 600,
    img: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 11,
    name: "Matthew Davis",
    phone: "+91-888-777-0090",
    email: "matthew.davis@example.com",
    memberSince: "30 Sep 2020",
    items: 5,
    points: 2000,
    img: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 12,
    name: "Olivia Martinez",
    phone: "+91-888-777-0091",
    email: "olivia.martinez@example.com",
    memberSince: "12 Dec 2019",
    items: 2,
    points: 1000,
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 13,
    name: "James Anderson",
    phone: "+91-888-777-0092",
    email: "james.anderson@example.com",
    memberSince: "06 Apr 2021",
    items: 4,
    points: 1600,
    img: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 14,
    name: "Sophia Thomas",
    phone: "+91-888-777-0093",
    email: "sophia.thomas@example.com",
    memberSince: "18 Feb 2022",
    items: 3,
    points: 1200,
    img: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 15,
    name: "Christopher Lee",
    phone: "+91-888-777-0094",
    email: "christopher.lee@example.com",
    memberSince: "25 Jan 2020",
    items: 5,
    points: 2200,
    img: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 16,
    name: "Ava Walker",
    phone: "+91-888-777-0095",
    email: "ava.walker@example.com",
    memberSince: "14 May 2021",
    items: 2,
    points: 950,
    img: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 17,
    name: "William Harris",
    phone: "+91-888-777-0096",
    email: "william.harris@example.com",
    memberSince: "09 Sep 2019",
    items: 3,
    points: 1300,
    img: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 18,
    name: "Mia Lewis",
    phone: "+91-888-777-0097",
    email: "mia.lewis@example.com",
    memberSince: "20 Oct 2020",
    items: 1,
    points: 500,
    img: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 19,
    name: "Benjamin Young",
    phone: "+91-888-777-0098",
    email: "benjamin.young@example.com",
    memberSince: "02 Mar 2022",
    items: 6,
    points: 2800,
    img: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: 20,
    name: "Charlotte King",
    phone: "+91-888-777-0099",
    email: "charlotte.king@example.com",
    memberSince: "15 Jul 2021",
    items: 4,
    points: 1900,
    img: "https://i.pravatar.cc/150?img=20",
  },
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Search filter
  const filteredData = customersData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Slice data for current page
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          All Customers ({filteredData.length})
        </h2>

        <input
          type="text"
          placeholder="Search by name, email or phone"
          className="w-full sm:w-64 lg:w-80 px-3 py-2 border rounded-lg text-sm outline-none shadow-sm"
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Desktop Table */}
      {paginatedData.length > 0 ? (
        <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 font-semibold text-gray-600 text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Member Since</th>
                <th className="px-4 py-3">Purchased Items</th>
                <th className="px-4 py-3">Points</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((c, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 text-gray-600 text-sm"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={c.img} className="w-8 h-8 rounded-full border" />
                    {c.name}
                  </td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.memberSince}</td>
                  <td className="px-4 py-3 text-[green]">{c.items} Items</td>
                  <td className="px-4 py-3">{c.points}</td>
                  <td className="px-4 py-3 text-right">
                  <button
  onClick={() => navigate(`/customer/${c.id}`, { state: c })}
  className="px-3 py-1 text-xs border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
>
  View Profile
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="hidden md:block p-6 text-center text-gray-500">
          No customers found.
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((c, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={c.img}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <h3 className="font-semibold text-gray-700">{c.name}</h3>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Phone:</strong> {c.phone}
                </p>
                <p>
                  <strong>Email:</strong> {c.email}
                </p>
                <p>
                  <strong>Member Since:</strong> {c.memberSince}
                </p>
                <p>
                  <strong>Purchased:</strong> {c.items} items
                </p>
                <p>
                  <strong>Points:</strong> {c.points}
                </p>
              </div>

             <button
  onClick={() => navigate(`/customer/${c.id}`, { state: c })}
  className="mt-4 w-full px-3 py-2 text-sm border rounded-md text-[green] border-[green] hover:bg-[green] hover:text-white transition"
>
  View Profile
</button>

            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No customers found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-[green] disabled:hover:text-inherit"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              page === i + 1
                ? "bg-[green] text-white"
                : "hover:bg-[green] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-[green] disabled:hover:text-inherit"
        >
          Next
        </button>
      </div>
    </div>
  );
}
