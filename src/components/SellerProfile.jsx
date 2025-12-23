//Deepti Kadam: In this code i add block unblock functinality in this 
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { CheckCircle, QrCode } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const tabs = ["Store Info", "Products", "Payment", "Review & Rating"];

const currentSeller = {
  name: "Shop.com",
  sellerName: "Sanjay Kumar",
  city: "Baner, Pune",
  phone: "+91-888-777-0080",
  email: "service@shop.com",
  rating: 4.5,
  totalProducts: 16,
  soldProducts: 341,
  earning: "₹19015",
  memberSince: "15 NOV 2025",
  image:
    "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=251&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
};

const productList = [
  {
    sku: "YHB826K98",
    name: "Fresh Organic Brinjals",
    price: 115,
    rating: 4.5,
    img: "https://www.bing.com/th/id/OIP.LRPVTH_fs6H_wr_Mqv9LpwHaFF?w=255&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Tomatoes",
    price: 150,
    rating: 5.0,
    img: "https://th.bing.com/th/id/OIP.5hDg2YV-aJRD74mg8Bbk3AHaE8?w=160&h=108&c=7&qlt=90&bgcl=15e219&r=0&o=6&cb=ucfimg1&dpr=1.3&pid=13.1&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Potatoes",
    price: 100,
    rating: 4.0,
    img: "https://www.bing.com/th/id/OIP.VbmDVZoch2S1fXeq1f44qQHaE8?w=274&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Cauliflower",
    price: 120,
    rating: 3.5,
    img: "https://cdn.pixabay.com/photo/2020/09/02/15/29/cauliflower-5538616_1280.jpg",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Green Chilli",
    price: 115,
    rating: 4.5,
    img: "https://th.bing.com/th/id/OIP.sjfw5Hkr2q3TAp3ssexfRwHaFj?w=249&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic coriander leaves",
    price: 105,
    rating: 5.0,
    img: "https://www.bing.com/th/id/OIP.GlXiYHm_kKyXP-_PcrFNfwHaFj?w=246&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Cabbage",
    price: 180,
    rating: 3.5,
    img: "https://www.bing.com/th/id/OIP.HmsYr-3DCI-7uRaXH0HnpQHaHa?w=188&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
  },
  {
    sku: "YHB826K98",
    name: "Fresh Organic Lady Fingers",
    price: 125,
    rating: 4.5,
    img: "https://www.bing.com/th/id/OIP.XrvravyNTlRnG2JqU01kewHaE8?w=255&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
  },
];

const reviewList = [
  {
    name: "Fresh Organic Potatoes",
    rating: 4.5,
    text: "Farm fresh...",
    img: "https://www.bing.com/th/id/OIP.VbmDVZoch2S1fXeq1f44qQHaE8?w=274&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
    by: "Green Valley Farm",
    date: "24 Nov 2025",
  },
  {
    name: "Fresh Organic Cabbage",
    rating: 4.0,
    text: "Excellent quality...",
    img: "https://www.bing.com/th/id/OIP.HmsYr-3DCI-7uRaXH0HnpQHaHa?w=188&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=1.3&pid=3.1&rm=2&ucfimg=1",
    by: "Green Valley Farm",
    date: "24 Nov 2025",
  },
];

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value }) => (
  <div className="flex-1 bg-gray-100 p-4 rounded-xl text-center min-w-[90px] shadow-sm">
    <p className="text-xs font-semibold text-gray-500 uppercase">{title}</p>
    <span className="text-lg font-bold text-gray-800 mt-1 block">
      {value}
    </span>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
    <img
      src={product.img}
      alt={product.name}
      className="w-full h-28 sm:h-32 object-cover"
      onError={(e) => {
        e.target.src =
          "https://placehold.co/200x120/E5E7EB/6B7280?text=No+Image";
      }}
    />

    <div className="p-3 flex flex-col justify-between flex-1">
      <div>
        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h4>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {product.sku}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-base">₹{product.price}</p>
        <span className="flex items-center text-xs bg-[green] text-[#fff] px-2 py-0.5 rounded-full">
          <AiFillStar className="w-3 h-3 mr-1" /> {product.rating}
        </span>
      </div>
    </div>
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <img
      src={review.img}
      alt={review.name}
      className="w-16 h-16 rounded-md object-cover"
    />
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{review.name}</p>

      <div className="flex items-center text-xs gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <AiFillStar
            key={i}
            className={
              i < Math.floor(review.rating)
                ? "text-green-500"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-500">
          ({review.rating})
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2">{review.text}</p>
      <p className="text-xs text-gray-400 mt-2">
        By {review.by} | {review.date}
      </p>
    </div>
  </div>
);

/* ---------------- MAIN APP ---------------- */

const App = () => {
  const [activeTab, setActiveTab] = useState("Store Info");
  const [searchText, setSearchText] = useState("");

  const [isBlocked, setIsBlocked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState("");

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 text-lg font-medium text-gray-700 cursor-pointer">
          <span
            onClick={() => window.history.back()}
            className="flex items-center gap-2 hover:text-black"
          >
            <span className="text-2xl">←</span>
            <span>Back</span>
          </span>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Profile
            </h1>

            <div className="flex gap-2 bg-gray-200 rounded-full p-1 w-full sm:w-auto">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full w-full sm:w-auto ${isBlocked
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={!isBlocked}
                onClick={() => {
                  setActionType("unblock");
                  setShowConfirm(true);
                }}
              >
                Unblock
              </button>

              <button
                className={`px-4 py-2 text-sm font-medium rounded-full w-full sm:w-auto ${!isBlocked
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={isBlocked}
                onClick={() => {
                  setActionType("block");
                  setShowConfirm(true);
                }}
              >
                Block
              </button>
            </div>
          </div>

          {/* Seller Info Section */}
          <div className="flex flex-col lg:flex-row gap-6 pb-6 border-b border-gray-200 ">
            <div className="flex flex-1 gap-4">
              <img
                src={currentSeller.image}
                className="w-20 h-20 rounded-full object-cover shadow"
              />
              <div>
                <h2 className="text-xl font-bold">{currentSeller.name}</h2>
                Seller: {currentSeller.sellerName}
                <p className="text-sm text-gray-500">{currentSeller.city}</p>


                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-[green] text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <AiFillStar className="mr-1" /> {currentSeller.rating}
                  </span>
                  <span className="text-xs text-gray-500">19,630 ratings and 146 reviews</span>
                </div>
              </div>
            </div>

            {/* Stats responsive grid */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              <StatCard title="Sold Products" value={currentSeller.soldProducts} />
              <StatCard title="Total Earning" value={currentSeller.earning} />
              <StatCard title="Member Since" value={currentSeller.memberSince} />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-300 mt-6 overflow-x-auto">
            <nav className="flex space-x-6 min-w-max">
              {tabs.map((item) => (
                <button
                  key={item}
                  className={`py-3 text-sm whitespace-nowrap ${activeTab === item
                    ? "border-b-2 border-[green] text-[green] font-semibold"
                    : "text-gray-500 hover:text-[green]"
                    }`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6 pb-4">
            {activeTab === "Store Info" && (
              <div>
                <h3 className="text-xl font-bold mb-5">Store Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Seller Name</p>
                    <p className="font-semibold text-gray-800">
                      {currentSeller.sellerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Store Name</p>
                    <p className="font-semibold text-gray-800">{currentSeller.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Email</p>
                    <p className="font-semibold text-gray-800">{currentSeller.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Mobile</p>
                    <p className="font-semibold text-gray-800">{currentSeller.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Business Number</p>
                    <p className="font-semibold text-gray-800">GHNEC00947829809</p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500 uppercase">Address</p>
                    <p className="font-semibold text-gray-800">
                      {currentSeller.city}, 123 Main Street, Pune
                    </p>
                  </div>
                </div>

                <h4 className="text-lg font-bold mt-8 mb-3 border-t border-gray-200 pt-6">Description</h4>

                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  Lorem ipsum simply dummy text...
                </p>
              </div>
            )}

            {activeTab === "Products" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
                  <h3 className="text-xl font-bold">All Products ({currentSeller.totalProducts})</h3>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
                    <FiSearch />
                    <input
                      className="bg-transparent outline-none text-sm"
                      placeholder="Search product..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map((p, i) => (
                    <ProductCard key={i} product={p} />
                  ))}

                </div>
              </div>
            )}

            {activeTab === "Payment" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Payment Cards — unchanged except responsive improvements */}
                <div className="bg-white p-6 shadow rounded-xl border-t-4 border-[green]">
                  <h4 className="font-bold mb-3">Mobile Payment</h4>
                  <p className="text-sm">Network: <span className="font-semibold">MTN Mobile Money</span></p>
                  <p className="text-sm mt-1">Mobile Number: {currentSeller.phone}</p>
                  <p className="text-sm mt-1">Merchant ID: 4075800480</p>
                </div>

                <div className="bg-white p-6 shadow rounded-xl border-t-4 border-[green]">
                  <h4 className="font-bold mb-3">Bank Transfer</h4>
                  <p className="text-sm">Account Number: 093879723908723</p>
                  <p className="text-sm mt-1">Name: Sanjay Kumar</p>
                  <p className="text-sm mt-1">IFSC: UTIB984776</p>
                </div>

                <div className="bg-white p-6 shadow rounded-xl border-t-4 border-[green]">
                  <h4 className="font-bold mb-3">Debit / Credit Card</h4>
                  <p className="text-sm">First Name: Sanjay</p>
                  <p className="text-sm mt-1">Last Name: Kumar</p>
                  <p className="text-sm mt-1">Card Number: 1098 7400 9176 891986</p>
                  <p className="text-sm mt-1">Valid Until: December 2030</p>
                </div>

                <div className="bg-white p-6 shadow rounded-xl border-t-4 border-[green] flex flex-col items-center text-center">
                  <h4 className="font-bold mb-3">Ghana QR Code</h4>
                  <QrCode className="w-20 h-20 text-[green] mb-2" />
                  <p className="text-xs text-gray-500">Scan to pay Merchant: 4075800480</p>
                </div>

                <div className="bg-white p-6 shadow rounded-xl border-t-4 border-[green] flex flex-col items-center text-center">
                  <h4 className="font-bold mb-3">Cash On Delivery</h4>
                  <CheckCircle className="w-10 h-10 text-[green]" />
                  <p className="text-sm text-[green] mt-3 font-semibold">Available</p>
                </div>
              </div>
            )}

            {activeTab === "Review & Rating" && (
              <div className="space-y-4">
                {reviewList.map((r, i) => (
                  <ReviewCard key={i} review={r} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CONFIRM POPUP */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {actionType === "block"
                  ? "Block Seller"
                  : "Unblock Seller"}
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to{" "}
                <span className="font-semibold">
                  {actionType === "block" ? "block" : "unblock"}
                </span>{" "}
                this seller?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>

                <button
                  className={`px-4 py-2 text-sm rounded-lg text-white ${actionType === "block"
                      ? "bg-red-500"
                      : "bg-green-600"
                    }`}
                  onClick={() => {
                    setIsBlocked(actionType === "block");
                    setShowConfirm(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
