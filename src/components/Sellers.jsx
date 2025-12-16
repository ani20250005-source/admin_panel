import React, { useState, useMemo} from "react";
import { useNavigate } from "react-router-dom";

// Static seller data
const sellersData = [
  {
    id: 1,
    sellerName: "John Carter",
    shopname: "ClassMet",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "classmet01@gmail.com",
    rating: 4.5,
    totalProducts: 80,
    soldProducts: 352,
    earning: "$22,500",
    image: "https://www.bing.com/th/id/OIP.BunBa3OuNZSih_gKCizMSAHaEo?w=240&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 2,
    sellerName: "Dean Yardi",
    shopname: "Top Brand",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "yardi.dean@topbrand.com",
    rating: 5.0,
    totalProducts: 23,
    soldProducts: 101,
    earning: "$10,020",
    image: "https://th.bing.com/th/id/OIP.SyYaU0TYRyiwcgLJyZhKQAHaEh?w=319&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: 3,
    sellerName: "Kevin Smith",
    shopname: "Four Design",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "kevin.fdesign@hotmail.com",
    rating: 4.5,
    totalProducts: 41,
    soldProducts: 285,
    earning: "$18,580",
    image: "https://www.bing.com/th/id/OIP.MaRera5xQXBNg4FjFMzgqAHaE1?w=256&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 4,
    sellerName: "Sara Lee",
    shopname: "Prime Store",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "prime@store.com",
    rating: 4.2,
    totalProducts: 60,
    soldProducts: 300,
    earning: "$21,200",
    image: "https://th.bing.com/th?q=Cut+Up+Chicken&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  { 
    id: 5,
    sellerName: "Mike Johnson",
    shopname: "Urban Mart",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "urban@mart.com",
    rating: 4.8,
    totalProducts: 20,
    soldProducts: 80,
    earning: "$5,420",
    image: "https://www.bing.com/th/id/OIP.RndHFxt44pCQNzLSmF6qWwHaD7?w=250&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 6,
    sellerName: "Linda Brown",
    shopname: "NextTech",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "next@tech.com",
    rating: 4.9,
    totalProducts: 77,
    soldProducts: 372,
    earning: "$25,680",
    image: "https://www.bing.com/th/id/OIP.RndHFxt44pCQNzLSmF6qWwHaD7?w=250&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 7,
    sellerName: "David Wilson",
    shopname: "Digital Point",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "info@digital.com",
    rating: 5.0,
    totalProducts: 50,
    soldProducts: 200,
    earning: "$14,500",
    image: "https://www.bing.com/th/id/OIP.BunBa3OuNZSih_gKCizMSAHaEo?w=240&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 8,
    sellerName: "Emma Davis",
    shopname: "Store Hub",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "hub@store.com",
    rating: 4.6,
    totalProducts: 32,
    soldProducts: 185,
    earning: "$9,700",
    image: "https://www.bing.com/th/id/OIP.RndHFxt44pCQNzLSmF6qWwHaD7?w=250&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 9,
    sellerName: "Olivia Martinez",
    shopname: "Trade Max",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "trade@max.com",
    rating: 4.4,
    totalProducts: 44,
    soldProducts: 210,
    earning: "$12,800",
    image: "https://www.bing.com/th/id/OIP.RndHFxt44pCQNzLSmF6qWwHaD7?w=250&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 10,
    sellerName: "Ethan Garcia",
    shopname: "Gadget God",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "god@gadget.com",
    rating: 4.8,
    totalProducts: 60,
    soldProducts: 355,
    earning: "$27,100",
    image: "https://www.bing.com/th/id/OIP.RndHFxt44pCQNzLSmF6qWwHaD7?w=250&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 11,
    sellerName: "Ava Hernandez",
    shopname: "Style Street",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "style@street.com",
    rating: 4.3,
    totalProducts: 19,
    soldProducts: 90,
    earning: "$4,950",
    image: "https://www.bing.com/th/id/OIP.BunBa3OuNZSih_gKCizMSAHaEo?w=240&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 12,
    sellerName: "Sophia Lopez",
    shopname: "FashionKing",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "king@fashion.com",
    rating: 3,
    totalProducts: 100,
    soldProducts: 480,
    earning: "$34,200",
    image: "https://th.bing.com/th/id/OIP.SyYaU0TYRyiwcgLJyZhKQAHaEh?w=319&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: 13,
    sellerName: "Mia Gonzalez",
    shopname: "Royal Store",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "royal@store.com",
    rating: 4.6,
    totalProducts: 35,
    soldProducts: 175,
    earning: "$10,590",
    image: "https://www.bing.com/th/id/OIP.MaRera5xQXBNg4FjFMzgqAHaE1?w=256&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 14,
    sellerName: "James Wilson",
    shopname: "DealsMart",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "deals@mart.com",
    rating: 2,
    totalProducts: 42,
    soldProducts: 255,
    earning: "$18,750",
    image: "https://th.bing.com/th?q=Cut+Up+Chicken&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  {
    id: 15,
    sellerName: "Isabella Taylor",
    shopname: "TechQueen",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "queen@tech.com",
    rating: 4.9,
    totalProducts: 90,
    soldProducts: 480,
    earning: "$37,800",
    image: "https://www.bing.com/th/id/OIP.MaRera5xQXBNg4FjFMzgqAHaE1?w=256&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
  {
    id: 16,
    sellerName: "Liam Anderson",
    shopname: "The Market",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "market@shop.com",
    rating: 4.2,
    totalProducts: 20,
    soldProducts: 85,
    earning: "$5,200",
    image: "https://th.bing.com/th/id/OIP.SyYaU0TYRyiwcgLJyZhKQAHaEh?w=319&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: 17,
    sellerName: "Noah Thomas",
    shopname: "QuickBuy",
    city: "Accra, Ghana",
    phone: "+91-888-000-3058",
    email: "quick@buy.com",
    rating: 4.5,
    totalProducts: 37,
    soldProducts: 210,
    earning: "$13,600",
    image: "https://www.bing.com/th/id/OIP.BunBa3OuNZSih_gKCizMSAHaEo?w=240&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  },
];

const Sellers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("popular");
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Search + Sorting Logic
  const filteredSellers = useMemo(() => {
    let filtered = sellersData.filter(
      (s) =>
        s.shopname.toLowerCase().includes(search.toLowerCase()) ||
        s.sellerName.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search)
    );

    if (sortType === "high-rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sortType === "low-rating") filtered.sort((a, b) => a.rating - b.rating);
    if (sortType === "earning")
      filtered.sort(
        (a, b) =>
          parseInt(b.earning.replace(/\D/g, "")) -
          parseInt(a.earning.replace(/\D/g, ""))
      );

    return filtered;
  }, [search, sortType]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredSellers.length / perPage);
  const paginatedData = filteredSellers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-700">
          All Merchant / Seller{" "}
          <span className="text-gray-500">({filteredSellers.length})</span>{" "}
        </h2>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by shopname, seller name, email or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border hover:border-[green] rounded-md py-2 pl-2 pr-3 text-sm outline-none"
            />
          </div>

          <select
            className="border rounded-md px-3 py-2 text-sm bg-white shadow-sm"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="popular">Sort By : Most Popular</option>
            <option value="high-rating">Highest Rating</option>
            <option value="low-rating">Lowest Rating</option>
            <option value="earning">Highest Earnings</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      {paginatedData.length > 0 ? (
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-gray-600">
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-500">
                <th className="px-4 py-3 text-left">SHOP NAME</th>
                <th className="px-4 py-3 text-left">SELLER NAME</th>
                <th className="px-4 py-3 text-left">PHONE NUMBER</th>
                <th className="px-4 py-3 text-left">EMAIL</th>
                <th className="px-4 py-3 text-left">RATING</th>
                <th className="px-4 py-3 text-left">TOTAL PRODUCTS</th>
                <th className="px-4 py-3 text-left">SOLD PRODUCTS</th>
                <th className="px-4 py-3 text-left">EARNING</th>
                <th className="px-4 py-3 text-left">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((s, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-300 hover:bg-gray-50 align-middle"
                >
                  {/* Shop Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={s.image}
                        alt={s.shopname}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-700">
                          {s.shopname}
                        </p>
                        <p className="text-xs text-gray-400">{s.city}</p>
                      </div>
                    </div>
                  </td>

                  {/* Seller Name */}
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {s.sellerName}
                  </td>

                  <td className="px-4 py-3">{s.phone}</td>
                  <td className="px-4 py-3">{s.email}</td>

                  <td className="px-4 py-3 text-green-500">
                    ⭐ <span className="text-gray-700">{s.rating}</span>
                  </td>

                  <td className="px-4 py-3 text-center">{s.totalProducts}</td>
                  <td className="px-4 py-3 text-center">
                    {s.soldProducts} Items
                  </td>

                  <td className="px-4 py-3 font-medium text-right">
                    {s.earning}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-[green] hover:text-white hover:bg-[green] border border-[green] px-3 py-1 rounded-md text-xs"
                      onClick={() =>
                        navigate(`/seller/${s.id}`, { state: { seller: s } })
                      }
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
        <div className="hidden md:block text-center p-6 text-gray-500">
          No sellers found matching your search.
        </div>
      )}

      {/* Mobile Card View */}
      <div className="md:hidden grid gap-4">
        {paginatedData.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-3">
              <img
                src={s.image}
                alt={s.shopname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-700">{s.shopname}</h3>
                <p className="text-xs text-gray-400">{s.city}</p>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>👤 Seller: {s.sellerName}</p>
              <p>📞 {s.phone}</p>
              <p>📩 {s.email}</p>
              <p>⭐ Rating: {s.rating}</p>
              <p>Total Products: {s.totalProducts}</p>
              <p>Sold Products: {s.soldProducts}</p>
              <p>Earning: {s.earning}</p>
            </div>

            <button
              className="mt-3 w-full text-[green] border border-[green] px-3 py-2 rounded-md text-sm"
              onClick={() =>
                navigate(`/seller/${s.id}`, { state: { seller: s } })
              }
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-6 text-sm select-none">
        <span
          className={`px-3 py-1 rounded ${
            page === 1 ? "text-gray-300" : "text-gray-600 hover:text-[green]"
          }`}
          onClick={() => page > 1 && setPage(page - 1)}
        >
          PREV
        </span>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-2.5 py-1 text-sm rounded border ${
              page === i + 1
                ? "bg-[green] text-white border-[green]"
                : "text-gray-700 bg-white hover:bg-[green]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <span
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "text-gray-300"
              : "text-gray-700 hover:text-[green]"
          }`}
          onClick={() => page < totalPages && setPage(page + 1)}
        >
          NEXT
        </span>
      </div>
    </div>
  );
};

export default Sellers;
